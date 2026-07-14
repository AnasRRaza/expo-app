import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Dropdown, { type DropdownItem } from '@/components/ui/dropdown';
import Input from '@/components/ui/Input';
import {
  ONBOARDING_STEP,
  ONBOARDING_TOTAL_STEPS,
  REFERRAL_SOURCE_OPTIONS,
} from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';

export default function HowDidYouFindUsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const onboarding = useAuthStore((state) => state.onboarding);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const [source, setSource] = useState(onboarding.referralSource);
  const [referrer, setReferrer] = useState(onboarding.referrer ?? '');
  const [error, setError] = useState(false);

  const data = useMemo<DropdownItem[]>(
    () => REFERRAL_SOURCE_OPTIONS.map((o) => ({ label: t(o.labelKey), value: o.value })),
    [t],
  );

  const handleSkip = () => {
    router.push('/account-created');
  };

  const handleContinue = () => {
    if (!source) {
      setError(true);
      return;
    }
    setOnboardingData({ referralSource: source, referrer: referrer.trim() || undefined });
    router.push('/account-created');
  };

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <AuthStepHeader
              step={ONBOARDING_STEP.howDidYouFindUs}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.howDidYouFindUs.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.howDidYouFindUs.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Dropdown
                label={t('onboarding.howDidYouFindUs.question')}
                placeholder={t('onboarding.howDidYouFindUs.dropdownPlaceholder')}
                data={data}
                value={source}
                labelField="label"
                valueField="value"
                onChange={(value) => {
                  setError(false);
                  setSource(value as typeof source);
                }}
                error={error && !source}
                errorMessage={t('onboarding.howDidYouFindUs.dropdownPlaceholder')}
              />

              <Input
                label={t('onboarding.howDidYouFindUs.referrerLabel')}
                placeholder={t('onboarding.howDidYouFindUs.referrerPlaceholder')}
                keyboardType="email-address"
                autoCapitalize="none"
                value={referrer}
                onChangeText={setReferrer}
              />

              <View style={styles.buttonRow}>
                <Button
                  mode="outlined"
                  icon="chevron-right"
                  contentStyle={styles.buttonContent}
                  textColor={theme.text}
                  style={styles.flex}
                  onPress={handleSkip}
                >
                  {t('onboarding.howDidYouFindUs.skip')}
                </Button>
                <Button
                  mode="contained"
                  icon="chevron-right"
                  contentStyle={styles.buttonContent}
                  style={styles.flex}
                  onPress={handleContinue}
                >
                  {t('onboarding.howDidYouFindUs.continue')}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
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
  form: {
    marginTop: vs(28),
    gap: vs(20),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: s(12),
    marginTop: vs(4),
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
});
