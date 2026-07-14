import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ONBOARDING_STEP, ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import type { TCompanyNameForm } from '@/utils/validationSchema';
import { getCompanyNameValidationSchema } from '@/utils/validationSchema';

export default function CompanyNameScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const companyName = useAuthStore((state) => state.onboarding.companyName);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCompanyNameForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getCompanyNameValidationSchema(t)),
    defaultValues: {
      companyName: companyName ?? '',
    },
  });

  const onSubmit: SubmitHandler<TCompanyNameForm> = (data) => {
    setOnboardingData({ companyName: data.companyName });
    router.push('/company-details');
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
              step={ONBOARDING_STEP.companyName}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.companyName.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.companyName.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="companyName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('onboarding.companyName.label')}
                    placeholder={t('onboarding.companyName.placeholder')}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="office-building-outline" color={theme.mutedText} />}
                    error={!!errors.companyName}
                    errorMessage={errors.companyName?.message}
                  />
                )}
              />

              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.continueContent}
                onPress={handleSubmit(onSubmit)}
              >
                {t('onboarding.companyName.continue')}
              </Button>
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
    gap: vs(24),
  },
  continueContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
});
