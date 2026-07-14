import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import { Image, type ImageSource } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

interface AdvisorCardProps {
  image: ImageSource;
  label: string;
  onPress: () => void;
}

// Avatar PNGs are 832×1248 (portrait 2:3); size by height, preserve aspect.
const AVATAR_HEIGHT = vs(66);
const AVATAR_WIDTH = AVATAR_HEIGHT * (832 / 1248);

export default function AdvisorCard({ image, label, onPress }: AdvisorCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.optionSelectedBackground,
          borderColor: theme.primary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image source={image} contentFit="contain" style={styles.avatar} />
      <ThemedText type="default" themeColor="primary" style={styles.label}>
        {label}
      </ThemedText>
      <Icon source="chevron-right" size={s(28)} color={theme.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    paddingHorizontal: s(14),
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
  },
  avatar: {
    width: AVATAR_WIDTH,
    height: AVATAR_HEIGHT,
    alignSelf: 'flex-end',
  },
  label: {
    flex: 1,
    fontWeight: '600',
  },
});
