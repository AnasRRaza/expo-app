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
import { ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import type { TFullNameForm } from '@/utils/validationSchema';
import { getFullNameValidationSchema } from '@/utils/validationSchema';

export default function FullNameScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const onboarding = useAuthStore((state) => state.onboarding);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);
  const signOut = useAuthStore((state) => state.signOut);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFullNameForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getFullNameValidationSchema(t)),
    defaultValues: {
      firstName: onboarding.firstName ?? '',
      lastName: onboarding.lastName ?? '',
    },
  });

  const onSubmit: SubmitHandler<TFullNameForm> = (data) => {
    setOnboardingData({ firstName: data.firstName, lastName: data.lastName });
    router.push('/professional-status');
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
            {/* First onboarding step: no in-stack history after the group swap, so
                Back cancels signup and returns to the auth flow. */}
            <AuthStepHeader step={2} totalSteps={ONBOARDING_TOTAL_STEPS} onBack={signOut} />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.fullName.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.fullName.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('onboarding.fullName.firstNameLabel')}
                    placeholder={t('onboarding.fullName.firstNamePlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="account-outline" color={theme.mutedText} />}
                    error={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('onboarding.fullName.lastNameLabel')}
                    placeholder={t('onboarding.fullName.lastNamePlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="account-outline" color={theme.mutedText} />}
                    error={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                  />
                )}
              />

              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.continueContent}
                onPress={handleSubmit(onSubmit)}
              >
                {t('onboarding.fullName.continue')}
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
