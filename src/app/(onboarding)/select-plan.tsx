import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { type ImageSource } from 'expo-image';
import { Link, useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import PlanCard from '@/components/ui/plan-card';
import {
  ONBOARDING_STEP,
  ONBOARDING_TOTAL_STEPS,
  type PlanId,
  PLANS,
} from '@/constants/onboarding';
import { useAuthStore } from '@/stores/use-auth-store';

const NAME_IMAGE = require('@/assets/images/svg/plan-essentia-name.svg') as ImageSource;
const PRICE_IMAGES: Record<PlanId, ImageSource> = {
  vat: require('@/assets/images/svg/plan-price-vat.svg') as ImageSource,
  'non-vat': require('@/assets/images/svg/plan-price-non-vat.svg') as ImageSource,
};

export default function SelectPlanScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const handleSelect = (id: PlanId) => {
    setOnboardingData({ plan: id });
    router.push('/set-password');
  };

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AuthStepHeader
            step={ONBOARDING_STEP.selectPlan}
            totalSteps={ONBOARDING_TOTAL_STEPS}
            backVariant="text"
          />

          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('onboarding.selectPlan.title')}</ThemedText>
            <ThemedText type="small" themeColor="mutedText">
              {t('onboarding.selectPlan.subtitle')}
            </ThemedText>
          </View>

          <View style={styles.plans}>
            {PLANS.map((p) => (
              <PlanCard
                key={p.id}
                chipLabel={t(p.chipKey)}
                name={t('onboarding.selectPlan.essentia')}
                nameImage={NAME_IMAGE}
                price={p.price}
                priceImage={PRICE_IMAGES[p.id]}
                period={t('onboarding.selectPlan.perMonth')}
                exclVat={t('onboarding.selectPlan.exclVat')}
                description={t(p.descriptionKey)}
                cta={t('onboarding.selectPlan.startFreeTrial')}
                badgeLabel={p.badge ? t('onboarding.selectPlan.forVatUsers') : undefined}
                onSelect={() => handleSelect(p.id)}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('onboarding.selectPlan.alreadyHaveAccount')}{' '}
            </ThemedText>
            <Link href="/login" asChild>
              <ThemedText type="small" themeColor="primary">
                {t('onboarding.selectPlan.login')}
              </ThemedText>
            </Link>
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
  plans: {
    marginTop: vs(20),
    gap: vs(20),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: vs(24),
  },
});
