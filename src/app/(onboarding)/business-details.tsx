import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MOCK_BUSINESS, ONBOARDING_STEP, ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';
import type { TManualVatForm } from '@/utils/validationSchema';
import { getManualVatValidationSchema } from '@/utils/validationSchema';

// Matches the mock format (2 country letters + dotted/spaced alphanumerics) — used
// only to drive the enabled/dimmed state of the manual Continue button.
const VAT_REGEX = /^[A-Za-z]{2}[0-9A-Za-z.\s]{6,20}$/;

export default function BusinessDetailsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const business = useAuthStore((state) => state.onboarding.business);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const [manualChecked, setManualChecked] = useState(!!business?.vatNumber && !business?.confirmed);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TManualVatForm>({
    mode: 'onSubmit',
    resolver: yupResolver(getManualVatValidationSchema(t)),
    defaultValues: {
      vatNumber: business?.vatNumber ?? '',
    },
  });

  const vatValue = watch('vatNumber');
  const manualReady = manualChecked && VAT_REGEX.test(vatValue?.trim() ?? '');

  const handleConfirm = () => {
    setOnboardingData({ business: { confirmed: true } });
    router.push('/vat-declaration');
  };

  const handleManualContinue = handleSubmit((data) => {
    if (!manualChecked) return;
    setOnboardingData({ business: { confirmed: false, vatNumber: data.vatNumber } });
    router.push('/vat-declaration');
  });

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder },
  ];

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
              step={ONBOARDING_STEP.businessDetails}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.businessDetails.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.businessDetails.subtitle')}
              </ThemedText>
            </View>

            <ThemedText type="small" style={styles.question}>
              {t('onboarding.businessDetails.question')}
            </ThemedText>

            {/* Card 1 — listed business */}
            <View style={cardStyle}>
              <View style={styles.twoColRow}>
                <Field
                  label={t('onboarding.businessDetails.nameLabel')}
                  value={MOCK_BUSINESS.name}
                />
                <Field
                  label={t('onboarding.businessDetails.companyNumberLabel')}
                  value={MOCK_BUSINESS.companyNumber}
                />
              </View>
              <Field
                label={t('onboarding.businessDetails.companyAddressLabel')}
                value={MOCK_BUSINESS.address}
              />
              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.confirmContent}
                onPress={handleConfirm}
              >
                {t('onboarding.businessDetails.confirm')}
              </Button>
            </View>

            {/* Card 2 — manual VAT */}
            <View style={[cardStyle, styles.manualCard]}>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: manualChecked }}
                onPress={() => setManualChecked((prev) => !prev)}
                style={styles.checkboxRow}
              >
                <ThemedText type="small" style={styles.checkboxLabel}>
                  {t('onboarding.businessDetails.manualCheckbox')}
                </ThemedText>
                <Checkbox.Android
                  status={manualChecked ? 'checked' : 'unchecked'}
                  color={theme.primary}
                  uncheckedColor={theme.mutedText}
                />
              </Pressable>

              <Controller
                control={control}
                name="vatNumber"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder={t('onboarding.businessDetails.vatPlaceholder')}
                    autoCapitalize="characters"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.vatNumber}
                    errorMessage={errors.vatNumber?.message}
                  />
                )}
              />

              <Button
                mode="contained"
                icon="chevron-right"
                contentStyle={styles.continueContent}
                style={!manualReady && styles.dimmed}
                onPress={() => void handleManualContinue()}
              >
                {t('onboarding.businessDetails.continue')}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <ThemedText type="small">{label}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {value}
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
  question: {
    marginTop: vs(28),
    marginBottom: vs(12),
  },
  card: {
    borderWidth: 1,
    borderRadius: s(16),
    padding: s(16),
    gap: vs(16),
  },
  manualCard: {
    marginTop: vs(16),
  },
  twoColRow: {
    flexDirection: 'row',
    gap: s(12),
  },
  field: {
    flex: 1,
    gap: vs(4),
  },
  confirmContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  checkboxLabel: {
    flex: 1,
  },
  continueContent: {
    paddingVertical: vs(6),
  },
  dimmed: {
    opacity: 0.5,
  },
});
