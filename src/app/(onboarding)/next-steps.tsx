import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import { ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';

// Placeholder / extension point. More onboarding steps follow the Self-Employed and
// Intentions screens (still to be designed). This screen intentionally does NOT call
// completeOnboarding() — onboarding is not finished here.
export default function NextStepsScreen() {
  const { t } = useTranslation();

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AuthStepHeader step={5} totalSteps={ONBOARDING_TOTAL_STEPS} />

          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('onboarding.nextSteps.title')}</ThemedText>
            <ThemedText type="small" themeColor="mutedText">
              {t('onboarding.nextSteps.message')}
            </ThemedText>
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
});
