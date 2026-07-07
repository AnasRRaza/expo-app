import { PaperProvider } from 'react-native-paper';
import { ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import {
  CombinedDarkTheme,
  CombinedLightTheme,
  NavigationDarkTheme,
  NavigationLightTheme,
} from '@/constants/paper-theme';
import { ThemePreferenceProvider, useThemePreference } from '@/hooks/use-theme-preference';

void SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { colorScheme } = useThemePreference();
  const isDark = colorScheme === 'dark';

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedLightTheme}>
      <ThemeProvider value={isDark ? NavigationDarkTheme : NavigationLightTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function TabLayout() {
  return (
    <ThemePreferenceProvider>
      <AppContent />
    </ThemePreferenceProvider>
  );
}
