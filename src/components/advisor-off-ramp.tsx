import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { type ImageSource } from 'expo-image';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import AdvisorCard from '@/components/ui/advisor-card';
import { ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';

// PNG (not the SVG) — the provided SVGs only wrap an embedded base64 PNG, which
// expo-image's SVG renderer can't draw; the PNG is the same artwork and renders.
const MIA_AVATAR = require('@/assets/images/png/mia-onboarding.png') as ImageSource;
const LEO_AVATAR = require('@/assets/images/png/leo-onboarding.png') as ImageSource;

// Shared "No problem!" / "No worries!" off-ramp: title + subtitle + two advisor
// cards. Terminal — no Continue, no completeOnboarding.
interface AdvisorOffRampProps {
  step: number;
  title: string;
  subtitle: string;
}

export default function AdvisorOffRamp({ step, title, subtitle }: AdvisorOffRampProps) {
  const { t } = useTranslation();

  // Guide / advisor destinations are not wired yet (no backend).
  const handleAdvisorAction = () => {
    /* TODO: open the self-employed guide / advisor contact when available. */
  };

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AuthStepHeader step={step} totalSteps={ONBOARDING_TOTAL_STEPS} backVariant="text" />

          <View style={styles.header}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          </View>

          <View style={styles.cards}>
            <AdvisorCard
              image={MIA_AVATAR}
              label={t('onboarding.advisor.learn')}
              onPress={handleAdvisorAction}
            />
            <AdvisorCard
              image={LEO_AVATAR}
              label={t('onboarding.advisor.talkToAdvisor')}
              onPress={handleAdvisorAction}
            />
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
  subtitle: {
    lineHeight: ms(20),
  },
  cards: {
    marginTop: vs(28),
    gap: vs(12),
  },
});
