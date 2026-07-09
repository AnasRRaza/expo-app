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
