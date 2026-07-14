import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import type { TSignupForm } from '@/utils/validationSchema';
import { getSignupValidationSchema } from '@/utils/validationSchema';

export default function SignupScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const setSession = useAuthStore((state) => state.setSession);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getSignupValidationSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  // No backend yet: store the email and set a mock session. Flipping the session
  // makes the root-layout guard mount the (onboarding) group at its initial route.
  const onSubmit: SubmitHandler<TSignupForm> = (data) => {
    setOnboardingData({ email: data.email });
    setSession({ userId: 'dev-user', token: 'dev-token' });
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
            <AuthStepHeader step={1} totalSteps={ONBOARDING_TOTAL_STEPS} />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('signup.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('signup.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('signup.emailLabel')}
                    placeholder={t('signup.emailPlaceholder')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="email-outline" color={theme.mutedText} />}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.continueContent}
                onPress={handleSubmit(onSubmit)}
              >
                {t('signup.continue')}
              </Button>
            </View>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
              <ThemedText type="small" themeColor="textSecondary">
                {t('signup.or')}
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
            </View>

            <View style={styles.socialRow}>
              <Button mode="outlined" icon="google" textColor={theme.text} style={styles.flex}>
                {t('signup.google')}
              </Button>
              <Button mode="outlined" icon="apple" textColor={theme.text} style={styles.flex}>
                {t('signup.apple')}
              </Button>
            </View>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('signup.alreadyHaveAccount')}{' '}
              </ThemedText>
              <Link href="/login" asChild>
                <ThemedText type="small" themeColor="primary">
                  {t('signup.login')}
                </ThemedText>
              </Link>
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    marginVertical: vs(20),
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: s(12),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});
