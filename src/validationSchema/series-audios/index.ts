import * as yup from 'yup';

export const seriesAudioValidationSchema = yup.object().shape({
  series_id: yup.string().nullable(),
  audio_id: yup.string().nullable(),
});
