import { StyleSheet, View, type ViewProps } from 'react-native';
import type { PropsWithChildren } from 'react';
import { Image } from 'expo-image';

import { useTheme } from '@/hooks/use-theme';
import { useThemePreference } from '@/hooks/use-theme-preference';

const backgroundSource = {
  light: require('@/assets/images/svg/light-bg.svg'),
  dark: require('@/assets/images/svg/dark-bg.svg'),
} as const;

export type ScreenBackgroundProps = PropsWithChildren<ViewProps>;

export function ScreenBackground({ children, style, ...otherProps }: ScreenBackgroundProps) {
  const theme = useTheme();
  const { colorScheme } = useThemePreference();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }, style]} {...otherProps}>
      <Image
        source={backgroundSource[colorScheme]}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
