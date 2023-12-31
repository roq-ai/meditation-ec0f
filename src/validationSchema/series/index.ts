import * as yup from 'yup';

export const seriesValidationSchema = yup.object().shape({
  title: yup.string().required(),
  organization_id: yup.string().nullable(),
});
