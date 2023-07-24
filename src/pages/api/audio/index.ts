import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { audioValidationSchema } from 'validationSchema/audio';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAudio();
    case 'POST':
      return createAudio();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAudio() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.audio
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'audio'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createAudio() {
    await audioValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.series_audio?.length > 0) {
      const create_series_audio = body.series_audio;
      body.series_audio = {
        create: create_series_audio,
      };
    } else {
      delete body.series_audio;
    }
    if (body?.subscriber_audio?.length > 0) {
      const create_subscriber_audio = body.subscriber_audio;
      body.subscriber_audio = {
        create: create_subscriber_audio,
      };
    } else {
      delete body.subscriber_audio;
    }
    const data = await prisma.audio.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
