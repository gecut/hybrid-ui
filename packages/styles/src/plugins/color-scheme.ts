import plugin from 'tailwindcss/plugin.js';

import type { Config } from 'tailwindcss';

export const _colorSchemeLight = {
  '--sys-color-primary': 'var(--ref-palette-primary40)',
  '--sys-color-primary-container': 'var(--ref-palette-primary90)',
  '--sys-color-on-primary': '255, 255, 255',
  '--sys-color-on-primary-container': 'var(--ref-palette-primary10)',
  '--sys-color-inverse-primary': 'var(--ref-palette-primary80)',

  '--sys-color-secondary': 'var(--ref-palette-secondary40)',
  '--sys-color-secondary-container': 'var(--ref-palette-secondary90)',
  '--sys-color-on-secondary': '255, 255, 255',
  '--sys-color-on-secondary-container': 'var(--ref-palette-secondary10)',

  '--sys-color-tertiary': 'var(--ref-palette-tertiary40)',
  '--sys-color-tertiary-container': 'var(--ref-palette-tertiary90)',
  '--sys-color-on-tertiary': '255, 255, 255',
  '--sys-color-on-tertiary-container': 'var(--ref-palette-tertiary10)',

  '--sys-color-background': 'var(--ref-palette-neutral98)',
  '--sys-color-surface': 'var(--ref-palette-neutral98)',
  '--sys-color-surface-bright': 'var(--ref-palette-neutral98)',
  '--sys-color-surface-dim': 'var(--ref-palette-neutral87)',
  '--sys-color-surface-container-lowest': '255, 255, 255',
  '--sys-color-surface-container-low': 'var(--ref-palette-neutral96)',
  '--sys-color-surface-container': 'var(--ref-palette-neutral94)',
  '--sys-color-surface-container-high': 'var(--ref-palette-neutral92)',
  '--sys-color-surface-container-highest': 'var(--ref-palette-neutral90)',
  '--sys-color-surface-variant': 'var(--ref-palette-neutral-variant90)',
  '--sys-color-inverse-surface': 'var(--ref-palette-neutral20)',

  '--sys-color-on-background': 'var(--ref-palette-neutral10)',
  '--sys-color-on-surface': 'var(--ref-palette-neutral10)',
  '--sys-color-on-surface-variant': 'var(--ref-palette-neutral-variant30)',
  '--sys-color-inverse-on-surface': 'var(--ref-palette-neutral95)',

  '--sys-color-outline': 'var(--ref-palette-neutral-variant50)',
  '--sys-color-outline-variant': 'var(--ref-palette-neutral-variant80)',

  '--sys-color-error': 'var(--ref-palette-error40)',
  '--sys-color-error-container': 'var(--ref-palette-error90)',
  '--sys-color-on-error': '255, 255, 255',
  '--sys-color-on-error-container': 'var(--ref-palette-error10)',

  '--sys-color-surface-tint': 'var(--sys-color-primary)',
  '--sys-color-shadow': 'var(--ref-palette-neutral0)',
  '--sys-color-scrim': 'var(--ref-palette-neutral0)'
} as const;

export const _colorSchemeDark = {
  '--sys-color-primary': 'var(--ref-palette-primary80)',
  '--sys-color-primary-container': 'var(--ref-palette-primary30)',
  '--sys-color-on-primary': 'var(--ref-palette-primary20)',
  '--sys-color-on-primary-container': 'var(--ref-palette-primary90)',
  '--sys-color-inverse-primary': 'var(--ref-palette-primary40)',

  '--sys-color-secondary': 'var(--ref-palette-secondary80)',
  '--sys-color-secondary-container': 'var(--ref-palette-secondary30)',
  '--sys-color-on-secondary': 'var(--ref-palette-secondary20)',
  '--sys-color-on-secondary-container': 'var(--ref-palette-secondary90)',

  '--sys-color-tertiary': 'var(--ref-palette-tertiary80)',
  '--sys-color-tertiary-container': 'var(--ref-palette-tertiary30)',
  '--sys-color-on-tertiary': 'var(--ref-palette-tertiary20)',
  '--sys-color-on-tertiary-container': 'var(--ref-palette-tertiary90)',

  '--sys-color-background': 'var(--ref-palette-neutral6)',
  '--sys-color-surface': 'var(--ref-palette-neutral6)',
  '--sys-color-surface-bright': 'var(--ref-palette-neutral24)',
  '--sys-color-surface-dim': 'var(--ref-palette-neutral6)',
  '--sys-color-surface-container-lowest': 'var(--ref-palette-neutral4)',
  '--sys-color-surface-container-low': 'var(--ref-palette-neutral10)',
  '--sys-color-surface-container': 'var(--ref-palette-neutral12)',
  '--sys-color-surface-container-high': 'var(--ref-palette-neutral17)',
  '--sys-color-surface-container-highest': 'var(--ref-palette-neutral22)',
  '--sys-color-surface-variant': 'var(--ref-palette-neutral-variant30)',
  '--sys-color-inverse-surface': 'var(--ref-palette-neutral90)',

  '--sys-color-on-background': 'var(--ref-palette-neutral90)',
  '--sys-color-on-surface': 'var(--ref-palette-neutral90)',
  '--sys-color-on-surface-variant': 'var(--ref-palette-neutral-variant80)',
  '--sys-color-inverse-on-surface': 'var(--ref-palette-neutral20)',

  '--sys-color-outline': 'var(--ref-palette-neutral-variant60)',
  '--sys-color-outline-variant': 'var(--ref-palette-neutral-variant30)',

  '--sys-color-error': 'var(--ref-palette-error80)',
  '--sys-color-error-container': 'var(--ref-palette-error30)',
  '--sys-color-on-error': 'var(--ref-palette-error20)',
  '--sys-color-on-error-container': 'var(--ref-palette-error90)',

  '--sys-color-surface-tint': 'var(--sys-color-primary)',
  '--sys-color-shadow': 'var(--ref-palette-neutral0)',
  '--sys-color-scrim': 'var(--ref-palette-neutral0)'
} as const;

export const _colorTheme = {
  /**
   * Primary colors
   */
  primary: 'rgba(var(--sys-color-primary), <alpha-value>)',
  primaryContainer: 'rgba(var(--sys-color-primary-container), <alpha-value>)',
  onPrimary: 'rgba(var(--sys-color-on-primary), <alpha-value>)',
  onPrimaryContainer: 'rgba(var(--sys-color-on-primary-container), <alpha-value>)',
  inversePrimary: 'rgba(var(--sys-color-inverse-primary), <alpha-value>)',
  /**
   * Secondary colors
   */
  secondary: 'rgba(var(--sys-color-secondary), <alpha-value>)',
  secondaryContainer: 'rgba(var(--sys-color-secondary-container), <alpha-value>)',
  onSecondary: 'rgba(var(--sys-color-on-secondary), <alpha-value>)',
  onSecondaryContainer: 'rgba(var(--sys-color-on-secondary-container), <alpha-value>)',
  /**
   * Tertiary colors
   */
  tertiary: 'rgba(var(--sys-color-tertiary), <alpha-value>)',
  tertiaryContainer: 'rgba(var(--sys-color-tertiary-container), <alpha-value>)',
  onTertiary: 'rgba(var(--sys-color-on-tertiary), <alpha-value>)',
  onTertiaryContainer: 'rgba(var(--sys-color-on-tertiary-container), <alpha-value>)',
  /**
   * Surface colors
   */
  background: 'rgba(var(--sys-color-background), <alpha-value>)',
  surface: 'rgba(var(--sys-color-surface), <alpha-value>)',
  surfaceDim: 'rgba(var(--sys-color-surface-dim), <alpha-value>)',
  surfaceBright: 'rgba(var(--sys-color-surface-bright), <alpha-value>)',
  surfaceContainerLowest: 'rgba(var(--sys-color-surface-container-lowest), <alpha-value>)',
  surfaceContainerLow: 'rgba(var(--sys-color-surface-container-low), <alpha-value>)',
  surfaceContainer: 'rgba(var(--sys-color-surface-container), <alpha-value>)',
  surfaceContainerHigh: 'rgba(var(--sys-color-surface-container-high), <alpha-value>)',
  surfaceContainerHighest: 'rgba(var(--sys-color-surface-container-highest), <alpha-value>)',
  surfaceVariant: 'rgba(var(--sys-color-surface-variant), <alpha-value>)',
  inverseSurface: 'rgba(var(--sys-color-inverse-surface), <alpha-value>)',
  onBackground: 'rgba(var(--sys-color-on-background), <alpha-value>)',
  onSurface: 'rgba(var(--sys-color-on-surface), <alpha-value>)',
  onSurfaceVariant: 'rgba(var(--sys-color-on-surface-variant), <alpha-value>)',
  inverseOnSurface: 'rgba(var(--sys-color-inverse-on-surface), <alpha-value>)',
  /**
   * Outline colors
   */
  outline: 'rgba(var(--sys-color-outline), <alpha-value>)',
  outlineVariant: 'rgba(var(--sys-color-outline-variant), <alpha-value>)',
  /**
   * Error colors
   */
  error: 'rgba(var(--sys-color-error), <alpha-value>)',
  errorContainer: 'rgba(var(--sys-color-error-container), <alpha-value>)',
  onError: 'rgba(var(--sys-color-on-error), <alpha-value>)',
  onErrorContainer: 'rgba(var(--sys-color-on-error-container), <alpha-value>)',
  /**
   * Other colors
   */
  surfaceTint: 'rgba(var(--sys-color-surface-tint), <alpha-value>)',
  shadow: 'rgba(var(--sys-color-shadow), <alpha-value>)',
  scrim: 'rgba(var(--sys-color-scrim), <alpha-value>)'
} as const;

export const colorTheme: Config['theme'] = {
  colors: _colorTheme
};

export const colorPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.color-scheme-light': _colorSchemeLight,
    '.color-scheme-dark': _colorSchemeDark,
    '.color-scheme-auto': {
      ..._colorSchemeLight,
      '@media (prefers-color-scheme: dark)': _colorSchemeDark
    }
  });
});
