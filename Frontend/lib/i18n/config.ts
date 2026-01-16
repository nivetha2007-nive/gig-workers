export type Language = 'en' | 'hi' | 'ta' | 'te';

export interface I18nConfig {
  defaultLanguage: Language;
  supportedLanguages: Language[];
  translationPath: string;
  persistLanguage: boolean;
}

export const i18nConfig: I18nConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi', 'ta', 'te'],
  translationPath: '/lib/i18n/translations',
  persistLanguage: true,
};

export const getLanguageName = (lang: Language): string => {
  const names: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
  };
  return names[lang];
};

export const getLanguageFlag = (lang: Language): string => {
  const flags: Record<Language, string> = {
    en: '🇬🇧',
    hi: '🇮🇳',
    ta: '🇮🇳',
    te: '🇮🇳',
  };
  return flags[lang];
};
