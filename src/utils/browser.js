import AppConfig from '../AppConfig';

export function getBrowserLanguage() {
  const { language, browserLanguage, userLanguage } = window.navigator;
  const locale = (language || browserLanguage || userLanguage || 'fr').split('-')[0];
  if (locale === 'fr' || locale === 'en') {
    return locale;
  }
  return AppConfig.defaultLocale;
}
