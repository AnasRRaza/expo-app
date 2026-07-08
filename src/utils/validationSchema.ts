import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('Email address is required')
    .email('Invalid email address')
    .matches(/^\S*$/, 'No white spaces are allowed'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^\S*$/, 'No white spaces are allowed'),
});
