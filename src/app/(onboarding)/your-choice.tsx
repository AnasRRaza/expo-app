import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import OptionCard from '@/components/ui/option-card';
import {
  ONBOARDING_STEP,
  ONBOARDING_TOTAL_STEPS,
  SELF_EMPLOYED_CHOICE_OPTIONS,
} from '@/constants/onboarding';
import type { SelfEmployedChoice } from '@/stores/use-auth-store';
import { useAuthStore } from '@/stores/use-auth-store';

export default function YourChoiceScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const selfEmployedChoice = useAuthStore((state) => state.onboarding.selfEmployedChoice);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const handleSelect = (value: SelfEmployedChoice) => {
    setOnboardingData({ selfEmployedChoice: value });
    // All choices lead to the advisor off-ramp for now.
    router.push('/no-problem');
  };

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthStepHeader
            step={ONBOARDING_STEP.yourChoice}
            totalSteps={ONBOARDING_TOTAL_STEPS}
            backVariant="text"
          />

          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('onboarding.yourChoice.title')}</ThemedText>
            <ThemedText type="small" themeColor="mutedText">
              {t('onboarding.yourChoice.subtitle')}
            </ThemedText>
          </View>

          <ThemedText type="small" style={styles.question}>
            {t('onboarding.yourChoice.question')}
          </ThemedText>

          <View style={styles.options}>
            {SELF_EMPLOYED_CHOICE_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                label={t(option.labelKey)}
                selected={selfEmployedChoice === option.value}
                onPress={() => handleSelect(option.value)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: s(24),
    paddingBottom: vs(24),
    flexGrow: 1,
  },
  header: {
    marginTop: vs(28),
    gap: vs(8),
  },
  title: {
    fontSize: ms(28),
    lineHeight: ms(36),
    fontWeight: '700',
  },
  question: {
    marginTop: vs(28),
    marginBottom: vs(12),
  },
  options: {
    gap: vs(12),
  },
});
