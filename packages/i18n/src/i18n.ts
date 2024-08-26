import {GecutLogger} from '@gecut/logger';
import {ContextSignal} from '@gecut/signal';

import type {DateTimeRelativeKey, I18nInterface, I18nOptions, LanguageNameType, LocaleType} from './types.js';

export class GecutI18N implements I18nInterface {
  constructor(options: I18nOptions) {
    this.options = options;

    this.language = options.sourceLanguage.name;
  }

  protected context = new ContextSignal<LocaleType>('i18n');
  protected options: I18nOptions;
  protected language: LanguageNameType;
  protected log = new GecutLogger('i18n');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  subscribe = this.context.subscribe.bind(this.context);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  unsubscribe = this.context.unsubscribe.bind(this.context);

  get locales(): LocaleType[] {
    return [this.options.sourceLanguage, ...this.options.targetLanguages];
  }

  get locale(): LocaleType {
    return this.locales.find((resource) => resource.name === this.language) as LocaleType;
  }

  setLocale(name: LanguageNameType): void {
    const resource = this.locales.find((resource) => resource.name === name);

    if (resource != null) {
      this.language = name;
    }

    const html = document.querySelector('html');

    if (html) {
      html.lang = this.locale.name;
      html.dir = this.locale.dir;
    }

    this.context.value = this.locale;
  }

  msg(source: string, variables: Record<`{${number}}`, string> = {}): string {
    this.log.methodArgs?.('msg', {source});

    let target = source;

    if (source in this.locale.translations) {
      target = this.locale.translations[source];
    }

    for (const variableKey of Object.keys(variables)) {
      if (Object.prototype.hasOwnProperty.call(variables, variableKey)) {
        const value = variables[variableKey as `{${number}}`];

        target = target.replace(variableKey, value);
      }
    }

    return target;
  }

  n(_number: string | number, options?: Intl.NumberFormatOptions): string {
    return Number(_number).toLocaleString(this.locale.name, {
      ...this.locale.formatters.number,
      ...(options ?? {}),
    });
  }

  d(_date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Date(_date).toLocaleString(this.locale.name, {
      ...this.locale.formatters.date,
      ...(options ?? {}),
    });
  }

  t(_time: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Date(_time).toLocaleString(this.locale.name, {
      ...this.locale.formatters.time,
      ...(options ?? {}),
    });
  }

  dt(_dateTime: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Date(_dateTime).toLocaleString(this.locale.name, {
      ...this.locale.formatters.dateTime,
      ...(options ?? {}),
    });
  }

  rt(_origin: string | Date, _destination: string | Date = new Date()): string {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    const units: Record<DateTimeRelativeKey, number> = {
      years: YEAR,
      months: MONTH,
      days: DAY,
      hours: HOUR,
      minutes: MINUTE,
      seconds: SECOND,
    };

    const origin = new Date(_origin);
    const destination = new Date(_destination);

    const elapsed = destination.getTime() - origin.getTime();

    for (const [unit, amount] of Object.entries(units)) {
      if (elapsed > amount) {
        const count = Math.floor(elapsed / amount);

        const resourceKey = GecutI18N.getResourcesKeyForRelativeTime(count, unit as DateTimeRelativeKey);

        return this.msg(resourceKey, {'{0}': Math.abs(count).toString()});
      }
    }

    return this.msg('just_now');
  }

  rtf(_origin: string | Date, _destination: string | Date = new Date()): string {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    const units: Record<DateTimeRelativeKey, number> = {
      years: YEAR,
      months: MONTH,
      days: DAY,
      hours: HOUR,
      minutes: MINUTE,
      seconds: SECOND,
    };

    const origin = new Date(_origin);
    const destination = new Date(_destination);

    let elapsed = destination.getTime() - origin.getTime();

    const timeUnits: Record<string, number> = {};

    for (const [unit, amount] of Object.entries(units)) {
      const count = Math.floor(elapsed / amount);
      if (count > 0) {
        timeUnits[unit] = count;
        elapsed -= count * amount;
      }
    }

    const timeStrings: string[] = [];

    for (const [unit, count] of Object.entries(timeUnits)) {
      const resourceKey = GecutI18N.getResourcesKeyForRelativeTime(count, unit as DateTimeRelativeKey);

      timeStrings.push(this.msg(resourceKey, {'{0}': count.toString()}));
    }

    if (timeStrings.length === 0) {
      return this.msg('just_now');
    }

    return timeStrings.join(' ' + this.msg('and') + ' ');
  }

  private static getResourcesKeyForRelativeTime(count: number, unit: DateTimeRelativeKey): string {
    if (count === 1) {
      return `one_${unit}`;
    }
    if (unit === 'seconds') {
      return 'other_seconds_ago';
    }
    return `other_${unit}`;
  }
}
