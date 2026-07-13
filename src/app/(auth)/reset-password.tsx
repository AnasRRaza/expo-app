import { useState } from 'react';
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
import { useTheme } from '@/hooks/use-theme';
import type { TResetPasswordForm } from '@/utils/validationSchema';
import { getResetPasswordValidationSchema } from '@/utils/validationSchema';

export default function ResetPasswordScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getResetPasswordValidationSchema(t)),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<TResetPasswordForm> = (data) => {
    console.log(data);
    router.replace('/password-changed');
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
            <AuthStepHeader step={2} totalSteps={2} />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('resetPassword.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('resetPassword.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('resetPassword.newPasswordLabel')}
                    placeholder={t('resetPassword.newPasswordPlaceholder')}
                    secureTextEntry={hidePassword}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="lock-outline" color={theme.mutedText} />}
                    right={
                      <Input.Icon
                        color={theme.primary}
                        icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        forceTextInputFocus={false}
                        onPress={() => setHidePassword((prev) => !prev)}
                      />
                    }
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('resetPassword.confirmPasswordLabel')}
                    placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                    secureTextEntry={hideConfirmPassword}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="lock-outline" color={theme.mutedText} />}
                    right={
                      <Input.Icon
                        color={theme.primary}
                        icon={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        forceTextInputFocus={false}
                        onPress={() => setHideConfirmPassword((prev) => !prev)}
                      />
                    }
                    error={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.continueContent}
                onPress={handleSubmit(onSubmit)}
              >
                {t('resetPassword.continue')}
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
