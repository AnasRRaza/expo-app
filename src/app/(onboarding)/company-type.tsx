import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';
import { Link, useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OptionCard from '@/components/ui/option-card';
import {
  COMPANY_TYPE_OPTIONS,
  ONBOARDING_STEP,
  ONBOARDING_TOTAL_STEPS,
} from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import type { CompanyType } from '@/stores/use-auth-store';
import { useAuthStore } from '@/stores/use-auth-store';

type PredefinedCompanyType = Exclude<CompanyType, 'other'>;

export default function CompanyTypeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const onboarding = useAuthStore((state) => state.onboarding);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const storedType = onboarding.companyType;
  const [selectedType, setSelectedType] = useState<PredefinedCompanyType | undefined>(
    storedType && storedType !== 'other' ? storedType : undefined,
  );
  const [otherChecked, setOtherChecked] = useState(storedType === 'other');
  const [otherText, setOtherText] = useState(onboarding.companyTypeOther ?? '');

  const ready = !!selectedType || (otherChecked && otherText.trim().length > 0);

  const handleSelectType = (value: PredefinedCompanyType) => {
    setSelectedType(value);
    setOtherChecked(false);
  };

  const toggleOther = () => {
    setOtherChecked((prev) => {
      const next = !prev;
      if (next) setSelectedType(undefined);
      return next;
    });
  };

  const handleContinue = () => {
    if (!ready) return;
    if (otherChecked) {
      setOnboardingData({ companyType: 'other', companyTypeOther: otherText.trim() });
    } else {
      setOnboardingData({ companyType: selectedType, companyTypeOther: undefined });
    }
    router.push('/company-name');
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
              step={ONBOARDING_STEP.companyType}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>
                {t('onboarding.companyEmployment.title')}
              </ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.companyEmployment.companyTypeSubtitle')}
              </ThemedText>
            </View>

            <ThemedText type="small" style={styles.question}>
              {t('onboarding.companyEmployment.question')}
            </ThemedText>

            <View style={styles.options}>
              {COMPANY_TYPE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  label={option.label}
                  selected={selectedType === option.value}
                  onPress={() => handleSelectType(option.value)}
                />
              ))}
            </View>

            <View
              style={[
                styles.card,
                { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder },
              ]}
            >
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: otherChecked }}
                onPress={toggleOther}
                style={styles.checkboxRow}
              >
                <ThemedText type="small" style={styles.checkboxLabel}>
                  {t('onboarding.companyEmployment.other')}
                </ThemedText>
                <Checkbox.Android
                  status={otherChecked ? 'checked' : 'unchecked'}
                  color={theme.primary}
                  uncheckedColor={theme.mutedText}
                />
              </Pressable>

              <Input
                placeholder={t('onboarding.companyEmployment.otherPlaceholder')}
                value={otherText}
                onChangeText={(text) => {
                  if (text.length > 0 && !otherChecked) setOtherChecked(true);
                  if (text.length > 0) setSelectedType(undefined);
                  setOtherText(text);
                }}
              />
            </View>

            <Button
              mode="contained"
              icon="chevron-right"
              contentStyle={styles.continueContent}
              style={[styles.continueButton, !ready && styles.dimmed]}
              onPress={handleContinue}
            >
              {t('onboarding.companyEmployment.continue')}
            </Button>

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('onboarding.companyEmployment.alreadyHaveAccount')}{' '}
              </ThemedText>
              <Link href="/login" asChild>
                <ThemedText type="small" themeColor="primary">
                  {t('onboarding.companyEmployment.login')}
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
  question: {
    marginTop: vs(28),
    marginBottom: vs(12),
  },
  options: {
    gap: vs(12),
  },
  card: {
    marginTop: vs(12),
    borderWidth: 1,
    borderRadius: s(16),
    padding: s(16),
    gap: vs(12),
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
  continueButton: {
    marginTop: vs(20),
  },
  dimmed: {
    opacity: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: vs(24),
  },
});
