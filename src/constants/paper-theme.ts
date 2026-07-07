import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from 'expo-router';

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
};

const darkColorOverrides = {
  primary: Colors.dark.primary,
  background: Colors.dark.background,
  text: Colors.dark.text,
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

// For <PaperProvider> — full MD3 shape.
export const CombinedLightTheme = {
  ...MD3LightTheme,
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
