import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { seriesAudioValidationSchema } from 'validationSchema/series-audios';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.series_audio
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSeriesAudioById();
    case 'PUT':
      return updateSeriesAudioById();
    case 'DELETE':
      return deleteSeriesAudioById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSeriesAudioById() {
    const data = await prisma.series_audio.findFirst(convertQueryToPrismaUtil(req.query, 'series_audio'));
    return res.status(200).json(data);
  }

  async function updateSeriesAudioById() {
    await seriesAudioValidationSchema.validate(req.body);
    const data = await prisma.series_audio.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSeriesAudioById() {
    const data = await prisma.series_audio.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
