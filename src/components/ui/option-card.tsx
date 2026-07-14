import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

interface OptionCardProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export default function OptionCard({ label, selected = false, onPress }: OptionCardProps) {
  const theme = useTheme();

  const borderColor = selected ? theme.primary : theme.inputBorder;
  const backgroundColor = selected ? theme.optionSelectedBackground : theme.inputBackground;
  const contentColor = selected ? theme.primary : theme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderColor, backgroundColor, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.labelWrapper}>
        <ThemedText type="small" style={{ color: contentColor }}>
          {label}
        </ThemedText>
      </View>
      <Icon source="chevron-right" size={s(20)} color={contentColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: vs(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: s(12),
    paddingVertical: vs(14),
    paddingHorizontal: s(16),
    borderWidth: 1,
    borderRadius: s(12),
  },
  labelWrapper: {
    flex: 1,
  },
});
