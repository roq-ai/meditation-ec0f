import * as yup from 'yup';

export const audioValidationSchema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  organization_id: yup.string().nullable(),
});
