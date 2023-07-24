import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSeriesAudio } from 'apiSdk/series-audios';
import { seriesAudioValidationSchema } from 'validationSchema/series-audios';
import { SeriesInterface } from 'interfaces/series';
import { AudioInterface } from 'interfaces/audio';
import { getSeries } from 'apiSdk/series';
import { getAudio } from 'apiSdk/audio';
import { SeriesAudioInterface } from 'interfaces/series-audio';

function SeriesAudioCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SeriesAudioInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSeriesAudio(values);
      resetForm();
      router.push('/series-audios');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SeriesAudioInterface>({
    initialValues: {
      series_id: (router.query.series_id as string) ?? null,
      audio_id: (router.query.audio_id as string) ?? null,
    },
    validationSchema: seriesAudioValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Series Audios',
              link: '/series-audios',
            },
            {
              label: 'Create Series Audio',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Series Audio
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<SeriesInterface>
            formik={formik}
            name={'series_id'}
            label={'Select Series'}
            placeholder={'Select Series'}
            fetcher={getSeries}
            labelField={'title'}
          />
          <AsyncSelect<AudioInterface>
            formik={formik}
            name={'audio_id'}
            label={'Select Audio'}
            placeholder={'Select Audio'}
            fetcher={getAudio}
            labelField={'title'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/series-audios')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'series_audio',
    operation: AccessOperationEnum.CREATE,
  }),
)(SeriesAudioCreatePage);
