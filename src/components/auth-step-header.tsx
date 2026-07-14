import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

import LanguageSwitcher from '@/components/language-switcher';
import { ThemedText } from '@/components/themed-text';
import StepProgress from '@/components/ui/step-progress';
import { useTheme } from '@/hooks/use-theme';

interface AuthStepHeaderProps {
  /** 1-indexed current step. */
  step: number;
  totalSteps: number;
  /** Overrides the default back behavior (used when there's no in-stack history to return to). */
  onBack?: () => void;
  /** 'icon' = rounded-square chevron (default); 'text' = green "‹ Back" label. */
  backVariant?: 'icon' | 'text';
}

export default function AuthStepHeader({
  step,
  totalSteps,
  onBack,
  backVariant = 'icon',
}: AuthStepHeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {backVariant === 'text' ? (
          <Pressable
            accessibilityRole="button"
            onPress={handleBack}
            style={({ pressed }) => [styles.backText, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Icon source="chevron-left" size={s(20)} color={theme.primary} />
            <ThemedText type="small" themeColor="primary" style={styles.backLabel}>
              {t('common.back')}
            </ThemedText>
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <Icon source="chevron-left" size={s(24)} color={theme.text} />
          </Pressable>
        )}
        <LanguageSwitcher />
      </View>
      <StepProgress step={step} totalSteps={totalSteps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: vs(16),
    gap: vs(20),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: s(40),
    height: s(40),
    borderRadius: s(12),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -s(4),
  },
  backLabel: {
    fontWeight: '600',
  },
});
