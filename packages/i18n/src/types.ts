import type {LiteralUnion} from 'type-fest';

export type LanguageNameType = `${Lowercase<string>}-${Uppercase<string>}`;

export interface LocaleType {
  dir: 'rtl' | 'ltr';
  name: LanguageNameType;
  localName: string;

  formatters: {
    number: Intl.NumberFormatOptions;
    date: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
    dateTime: Intl.DateTimeFormatOptions;
  };

  translations: Record<LiteralUnion<BaseTranslationsKeys, string>, string>;
}

type __DateTimeRelativeKey = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export type BaseTranslationsKeys =
  | `one_${__DateTimeRelativeKey}s_ago`
  | `other_${__DateTimeRelativeKey}s_ago`
  | `one_${__DateTimeRelativeKey}s`
  | `other_${__DateTimeRelativeKey}s`
  | 'and'
  | 'just_now';

export type DateTimeRelativeKey = `${__DateTimeRelativeKey}s`;

export interface I18nOptions {
  sourceLanguage: LocaleType;
  targetLanguages: LocaleType[];
}

export interface I18nInterface {
  n(_number: string | number, options?: Intl.NumberFormatOptions): string;
  d(_date: string | Date, options?: Intl.NumberFormatOptions): string;
  t(_time: string | Date, options?: Intl.NumberFormatOptions): string;
  dt(_dateTime: string | Date, options?: Intl.NumberFormatOptions): string;
  rt(_dateTime: string | Date): string;

  msg(source: string, variables?: Record<string, string>): string;

  setLocale(name: LanguageNameType): void;

  get locales(): LocaleType[];
  get locale(): LocaleType;
}
