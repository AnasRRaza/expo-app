/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  white: '#ffffff',
  black: '#000000',
  red: '#FF3B3B',
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    primary: '#2B844E',
    inputBackground: '#FAFBFC',
    inputBorder: '#E3DBDB',
    mutedText: '#4A4A4A',
    // Faint green tint behind a selected OptionCard (paired with a primary border/text).
    optionSelectedBackground: '#EAF3EE',
    // Opaque (matches inputBackground) — Paper's Surface double-layering is a
    // no-op on opaque colors, so no alpha compensation needed in light mode.
    outlinedButtonBackground: '#FAFBFC',
    outlinedButtonBorder: '#E3DBDB',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    primary: '#2B844E',
    inputBackground: 'rgba(255, 255, 255, 0.08)',
    inputBorder: 'rgba(255, 255, 255, 0.18)',
    mutedText: '#C7CBD1',
    // Translucent green tint behind a selected OptionCard (paired with a primary border/text).
    optionSelectedBackground: 'rgba(43, 132, 78, 0.18)',
    // Half of inputBackground's 0.08 alpha: Paper renders the outlined Button on
    // a <Surface container> that paints the bg on two stacked layers, doubling
    // translucency. 0.04 doubled ≈ 0.08, so the fill visually matches the inputs.
    outlinedButtonBackground: 'rgba(255, 255, 255, 0.04)',
    outlinedButtonBorder: 'rgba(255, 255, 255, 0.6)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
