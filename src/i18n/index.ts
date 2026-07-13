import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';

import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';

export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: SupportedLocale = 'en';

export const LOCALE_META: Record<SupportedLocale, { label: string; flag: string }> = {
  en: { label: 'EN', flag: '🇬🇧' },
  es: { label: 'ES', flag: '🇪🇸' },
};

function resolveInitialLocale(): SupportedLocale {
  const deviceLanguageCode = getLocales()[0]?.languageCode;
  const isSupported = (SUPPORTED_LOCALES as readonly string[]).includes(deviceLanguageCode ?? '');

  return isSupported ? (deviceLanguageCode as SupportedLocale) : DEFAULT_LOCALE;
}

// Passing `resources` directly (no backend/network fetch) makes i18next's internal init
// synchronous: t() returns real strings the instant this module finishes evaluating,
// before React renders anything. No splash-screen gating needed for i18n.
void i18next.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: resolveInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false }, // no HTML/XSS risk in React Native
  react: { useSuspense: false },
});

export default i18next;
