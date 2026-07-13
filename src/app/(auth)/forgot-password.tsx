import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTheme } from '@/hooks/use-theme';
import type { TForgotPasswordForm } from '@/utils/validationSchema';
import { getForgotPasswordValidationSchema } from '@/utils/validationSchema';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getForgotPasswordValidationSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<TForgotPasswordForm> = (data) => {
    console.log(data);
    router.push('/reset-password');
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
            <AuthStepHeader step={1} totalSteps={2} />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('forgotPassword.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('forgotPassword.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('forgotPassword.emailLabel')}
                    placeholder={t('forgotPassword.emailPlaceholder')}
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
                {t('forgotPassword.continue')}
              </Button>
            </View>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('forgotPassword.alreadyHaveAccount')}{' '}
              </ThemedText>
              <Link href="/login" asChild>
                <ThemedText type="small" themeColor="primary">
                  {t('forgotPassword.login')}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});
