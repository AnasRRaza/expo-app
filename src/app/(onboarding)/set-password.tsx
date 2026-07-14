import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';
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
import type { TSetPasswordForm } from '@/utils/validationSchema';
import { getSetPasswordValidationSchema } from '@/utils/validationSchema';

export default function SetPasswordScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSetPasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getSetPasswordValidationSchema(t)),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Password is intentionally not persisted to the store — validate and advance only.
  const onSubmit: SubmitHandler<TSetPasswordForm> = () => {
    router.push('/how-did-you-find-us');
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
              step={ONBOARDING_STEP.setPassword}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.setPassword.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.setPassword.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.rules}>
              <Rule text={t('onboarding.setPassword.rule1')} color={theme.primary} />
              <Rule text={t('onboarding.setPassword.rule2')} color={theme.primary} />
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('onboarding.setPassword.passwordLabel')}
                    placeholder={t('onboarding.setPassword.passwordPlaceholder')}
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
                    label={t('onboarding.setPassword.confirmPasswordLabel')}
                    placeholder={t('onboarding.setPassword.confirmPasswordPlaceholder')}
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
                {t('onboarding.setPassword.continue')}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function Rule({ text, color }: { text: string; color: string }) {
  return (
    <View style={styles.ruleRow}>
      <Icon source="check-circle-outline" size={s(16)} color={color} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.ruleText}>
        {text}
      </ThemedText>
    </View>
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
  rules: {
    marginTop: vs(16),
    gap: vs(6),
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  ruleText: {
    flex: 1,
  },
  form: {
    marginTop: vs(24),
    gap: vs(24),
  },
  continueContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
});
