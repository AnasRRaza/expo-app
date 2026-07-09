import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import type { TLoginForm } from '@/utils/validationSchema';
import { getLoginValidationSchema } from '@/utils/validationSchema';

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);

  const { t } = useTranslation();
  const theme = useTheme();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getLoginValidationSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    console.log(data);
  };

  return (
    <ThemedView style={styles.container}>
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
            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('login.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('login.subtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('login.emailLabel')}
                    placeholder={t('login.emailPlaceholder')}
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

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t('login.passwordLabel')}
                    placeholder={t('login.passwordPlaceholder')}
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

              <ThemedText type="default" themeColor="primary" style={styles.forgotPassword}>
                {t('login.forgotPassword')}
              </ThemedText>
            </View>

            <Button
              mode="contained"
              icon="chevron-right"
              contentStyle={styles.signInContent}
              onPress={handleSubmit(onSubmit)}
            >
              {t('login.signIn')}
            </Button>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
              <ThemedText type="small" themeColor="textSecondary">
                {t('login.or')}
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
            </View>

            <View style={styles.socialRow}>
              <Button mode="outlined" icon="google" textColor={theme.text} style={styles.flex}>
                {t('login.google')}
              </Button>
              <Button mode="outlined" icon="apple" textColor={theme.text} style={styles.flex}>
                {t('login.apple')}
              </Button>
            </View>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('login.noAccount')}{' '}
              </ThemedText>
              <Link href="/signup" asChild>
                <ThemedText type="small" themeColor="primary">
                  {t('login.signUp')}
                </ThemedText>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
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
    marginTop: vs(16),
    gap: vs(8),
  },
  title: {
    fontSize: ms(28),
    lineHeight: ms(36),
    fontWeight: '700',
  },
  form: {
    marginTop: vs(28),
    gap: vs(16),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: vs(8),
  },
  signInContent: {
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
