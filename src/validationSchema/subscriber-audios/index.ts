import * as yup from 'yup';

export const subscriberAudioValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  audio_id: yup.string().nullable(),
});
