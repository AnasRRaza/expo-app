import {
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import { DarkTheme, DefaultTheme } from 'expo-router';

import { ManropeFonts } from '@/constants/fonts';
import { Colors } from '@/constants/theme';

// expo-router's DefaultTheme/DarkTheme type `colors.primary` etc. as `ColorValue`
// (newer @react-navigation/native), but react-native-paper@5's bundled
// `NavigationTheme` type still expects plain `string`. The actual values are
// always literal hex strings at runtime, so this is a types-only mismatch.
type PaperNavigationTheme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme as PaperNavigationTheme,
  reactNavigationDark: DarkTheme as PaperNavigationTheme,
});

const lightColorOverrides = {
  primary: Colors.light.primary,
  background: Colors.light.background,
  text: Colors.light.text,
  error: Colors.red,
};

const darkColorOverrides = {
  primary: Colors.dark.primary,
  background: Colors.dark.background,
  text: Colors.dark.text,
  error: Colors.red,
};

// For expo-router's <ThemeProvider> (React Navigation) — keeps React
// Navigation's own `fonts` shape, which Paper's MD3 typescale isn't compatible with.
export const NavigationLightTheme = {
  ...DefaultTheme,
  colors: { ...AdaptedLightTheme.colors, ...lightColorOverrides },
};

export const NavigationDarkTheme = {
  ...DarkTheme,
  colors: { ...AdaptedDarkTheme.colors, ...darkColorOverrides },
};

// MD3's regular/medium typescale split (display*/headline*/titleLarge/body* vs
// titleMedium/titleSmall/label*), remapped onto Manrope's static weight files —
// the flat configureFonts({ config: { fontFamily } }) form would apply one
// family to every variant and erase this split, so the per-variant form is used.
const manropeFontConfig = {
  displayLarge: { fontFamily: ManropeFonts.regular },
  displayMedium: { fontFamily: ManropeFonts.regular },
  displaySmall: { fontFamily: ManropeFonts.regular },
  headlineLarge: { fontFamily: ManropeFonts.regular },
  headlineMedium: { fontFamily: ManropeFonts.regular },
  headlineSmall: { fontFamily: ManropeFonts.regular },
  titleLarge: { fontFamily: ManropeFonts.regular },
  titleMedium: { fontFamily: ManropeFonts.medium },
  titleSmall: { fontFamily: ManropeFonts.medium },
  labelLarge: { fontFamily: ManropeFonts.medium },
  labelMedium: { fontFamily: ManropeFonts.medium },
  labelSmall: { fontFamily: ManropeFonts.medium },
  bodyLarge: { fontFamily: ManropeFonts.regular },
  bodyMedium: { fontFamily: ManropeFonts.regular },
  bodySmall: { fontFamily: ManropeFonts.regular },
} as const;

// `default` isn't part of MD3TypescaleKey (used by Paper's internal <Text>
// when no `variant` prop is given), so configureFonts can't set it — patched
// separately. Shared by both themes since fonts don't vary by color scheme.
const manropeFonts = {
  ...configureFonts({ config: manropeFontConfig }),
  default: { ...MD3LightTheme.fonts.default, fontFamily: ManropeFonts.regular },
};

// For <PaperProvider> — full MD3 shape.
export const CombinedLightTheme = {
  ...MD3LightTheme,
  fonts: manropeFonts,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColorOverrides,
    onBackground: Colors.light.text,
    surface: Colors.light.backgroundElement,
    onSurface: Colors.light.text,
    onSurfaceVariant: Colors.light.textSecondary,
    secondaryContainer: Colors.light.backgroundSelected,
  },
};

export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  fonts: manropeFonts,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColorOverrides,
    onBackground: Colors.dark.text,
    surface: Colors.dark.backgroundElement,
    onSurface: Colors.dark.text,
    onSurfaceVariant: Colors.dark.textSecondary,
    secondaryContainer: Colors.dark.backgroundSelected,
  },
};
