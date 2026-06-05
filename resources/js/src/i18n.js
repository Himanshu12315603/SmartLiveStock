import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationTE from './locales/te/translation.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  te: { translation: translationTE }
};

const savedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
