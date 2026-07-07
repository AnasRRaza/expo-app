import { useColorScheme } from 'react-native';
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

void SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
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
