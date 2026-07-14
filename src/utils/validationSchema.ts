import type { TFunction } from 'i18next';
import * as Yup from 'yup';

export function getLoginValidationSchema(t: TFunction) {
  return Yup.object({
    email: Yup.string()
      .required(t('validation.email.required'))
      .email(t('validation.email.invalid'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
    password: Yup.string()
      .required(t('validation.password.required'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
  });
}

export type TLoginForm = Yup.InferType<ReturnType<typeof getLoginValidationSchema>>;

export function getForgotPasswordValidationSchema(t: TFunction) {
  return Yup.object({
    email: Yup.string()
      .required(t('validation.email.required'))
      .email(t('validation.email.invalid'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
  });
}

export type TForgotPasswordForm = Yup.InferType<
  ReturnType<typeof getForgotPasswordValidationSchema>
>;

export function getResetPasswordValidationSchema(t: TFunction) {
  return Yup.object({
    password: Yup.string()
      .required(t('validation.password.required'))
      .min(8, t('validation.password.min'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
    confirmPassword: Yup.string()
      .required(t('validation.confirmPassword.required'))
      .oneOf([Yup.ref('password')], t('validation.confirmPassword.mustMatch')),
  });
}

export type TResetPasswordForm = Yup.InferType<ReturnType<typeof getResetPasswordValidationSchema>>;

export function getSignupValidationSchema(t: TFunction) {
  return Yup.object({
    email: Yup.string()
      .required(t('validation.email.required'))
      .email(t('validation.email.invalid'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
  });
}

export type TSignupForm = Yup.InferType<ReturnType<typeof getSignupValidationSchema>>;

export function getFullNameValidationSchema(t: TFunction) {
  return Yup.object({
    firstName: Yup.string().required(t('validation.firstName.required')),
    lastName: Yup.string().required(t('validation.lastName.required')),
  });
}

export type TFullNameForm = Yup.InferType<ReturnType<typeof getFullNameValidationSchema>>;

export function getManualVatValidationSchema(t: TFunction) {
  return Yup.object({
    // Lenient mock format: 2 country letters + digits, allowing dots/spaces
    // (e.g. BE0123.456.789). No backend.
    vatNumber: Yup.string()
      .required(t('validation.vat.required'))
      .matches(/^[A-Za-z]{2}[0-9A-Za-z.\s]{6,20}$/, t('validation.vat.invalid')),
  });
}

export type TManualVatForm = Yup.InferType<ReturnType<typeof getManualVatValidationSchema>>;

export function getSetPasswordValidationSchema(t: TFunction) {
  return Yup.object({
    password: Yup.string()
      .required(t('validation.password.required'))
      .min(8, t('validation.password.min'))
      .max(50, t('validation.password.max'))
      .matches(/[A-Z]/, t('validation.password.uppercase'))
      .matches(/[a-z]/, t('validation.password.lowercase'))
      .matches(/[0-9]/, t('validation.password.digit'))
      .matches(/^\S*$/, t('validation.noWhitespace')),
    confirmPassword: Yup.string()
      .required(t('validation.confirmPassword.required'))
      .oneOf([Yup.ref('password')], t('validation.confirmPassword.mustMatch')),
  });
}

export type TSetPasswordForm = Yup.InferType<ReturnType<typeof getSetPasswordValidationSchema>>;
