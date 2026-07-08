import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'expo-router';
import type * as Yup from 'yup';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import { loginValidationSchema } from '@/utils/validationSchema';

type TLoginForm = Yup.InferType<typeof loginValidationSchema>;

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);

  const theme = useTheme();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: 'onSubmit',
    resolver: yupResolver(loginValidationSchema),
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
              <ThemedText style={styles.title}>Login</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                Enter your email and password to access Sandelia.
              </ThemedText>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email"
                    placeholder="domat@example.com"
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
                    label="Password"
                    placeholder="••••••••••••"
                    secureTextEntry={hidePassword}
                    value={value}
                    onChangeText={onChange}
                    left={<Input.Icon icon="lock-outline" color={theme.mutedText} />}
                    right={
                      <Input.Icon
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
                Forgot password?
              </ThemedText>
            </View>

            <Button
              mode="contained"
              icon="chevron-right"
              contentStyle={styles.signInContent}
              onPress={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
              <ThemedText type="small" themeColor="textSecondary">
                OR
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: theme.backgroundSelected }]} />
            </View>

            <View style={styles.socialRow}>
              <Button mode="outlined" icon="google" textColor={theme.text} style={styles.flex}>
                Google
              </Button>
              <Button mode="outlined" icon="apple" textColor={theme.text} style={styles.flex}>
                Apple
              </Button>
            </View>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                Don&apos;t have an account?{' '}
              </ThemedText>
              <Link href="/signup" asChild>
                <ThemedText type="small" themeColor="primary">
                  Sign up
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
