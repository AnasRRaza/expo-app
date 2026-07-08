import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import {
  CombinedDarkTheme,
  CombinedLightTheme,
  NavigationDarkTheme,
  NavigationLightTheme,
} from '@/constants/paper-theme';
import { ThemePreferenceProvider, useThemePreference } from '@/hooks/use-theme-preference';
import { useAuthStore } from '@/stores/use-auth-store';

void SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { colorScheme } = useThemePreference();
  const isDark = colorScheme === 'dark';
  const session = useAuthStore((state) => state.session);
  const onboardingComplete = useAuthStore((state) => state.onboardingComplete);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    void useAuthStore.persist.rehydrate();
  }, []);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedLightTheme}>
      <ThemeProvider value={isDark ? NavigationDarkTheme : NavigationLightTheme}>
        <AnimatedSplashOverlay ready={hasHydrated} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!session}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={!!session && !onboardingComplete}>
            <Stack.Screen name="(onboarding)" />
          </Stack.Protected>
          <Stack.Protected guard={!!session && onboardingComplete}>
            <Stack.Screen name="(drawer)" />
          </Stack.Protected>
        </Stack>
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
