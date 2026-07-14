import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import OptionCard from '@/components/ui/option-card';
import { INTENTION_OPTIONS, ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import type { Intention } from '@/stores/use-auth-store';
import { useAuthStore } from '@/stores/use-auth-store';

export default function IntentionsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const intention = useAuthStore((state) => state.onboarding.intention);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const handleSelect = (value: Intention) => {
    setOnboardingData({ intention: value });
    router.push('/next-steps');
  };

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthStepHeader step={4} totalSteps={ONBOARDING_TOTAL_STEPS} />

          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('onboarding.intentions.title')}</ThemedText>
            <ThemedText type="small" themeColor="mutedText">
              {t('onboarding.intentions.subtitle')}
            </ThemedText>
          </View>

          <ThemedText type="small" style={styles.question}>
            {t('onboarding.intentions.question')}
          </ThemedText>

          <View style={styles.options}>
            {INTENTION_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                label={t(option.labelKey)}
                selected={intention === option.value}
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
