import { useMemo, useState } from 'react';
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
import { useRouter } from 'expo-router';

import AuthStepHeader from '@/components/auth-step-header';
import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import Dropdown, { type DropdownItem } from '@/components/ui/dropdown';
import Input from '@/components/ui/Input';
import { ONBOARDING_STEP, ONBOARDING_TOTAL_STEPS, PROFESSION_GROUPS } from '@/constants/onboarding';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';

export default function ProfessionScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const onboarding = useAuthStore((state) => state.onboarding);
  const setOnboardingData = useAuthStore((state) => state.setOnboardingData);

  const [profession, setProfession] = useState(onboarding.profession);
  const [cantFind, setCantFind] = useState(!!onboarding.professionCustom);
  const [custom, setCustom] = useState(onboarding.professionCustom ?? '');
  const [error, setError] = useState(false);

  // Flatten the grouped profession list into dropdown rows with non-selectable headers.
  const data = useMemo<DropdownItem[]>(
    () =>
      PROFESSION_GROUPS.flatMap((group) => [
        { label: t(group.titleKey), value: `header-${group.code}`, isHeader: true },
        ...group.items.map((item) => ({ label: t(item.labelKey), value: item.value })),
      ]),
    [t],
  );

  const handleContinue = () => {
    if (cantFind) {
      if (!custom.trim()) {
        setError(true);
        return;
      }
      setOnboardingData({ profession: undefined, professionCustom: custom.trim() });
    } else {
      if (!profession) {
        setError(true);
        return;
      }
      setOnboardingData({ profession, professionCustom: undefined });
    }
    router.push('/select-plan');
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
              step={ONBOARDING_STEP.profession}
              totalSteps={ONBOARDING_TOTAL_STEPS}
              backVariant="text"
            />

            <View style={styles.header}>
              <ThemedText style={styles.title}>{t('onboarding.profession.title')}</ThemedText>
              <ThemedText type="small" themeColor="mutedText">
                {t('onboarding.profession.subtitle')}
              </ThemedText>
            </View>

            <ThemedText type="small" style={styles.question}>
              {t('onboarding.profession.question')}
            </ThemedText>

            <Dropdown
              placeholder={t('onboarding.profession.dropdownPlaceholder')}
              data={data}
              labelField="label"
              valueField="value"
              value={profession}
              onChange={(value) => {
                setError(false);
                setProfession(value);
              }}
              error={error && !cantFind && !profession}
            />

            <View
              style={[
                styles.card,
                { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder },
              ]}
            >
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: cantFind }}
                onPress={() => {
                  setError(false);
                  setCantFind((prev) => !prev);
                }}
                style={styles.checkboxRow}
              >
                <ThemedText type="small" style={styles.checkboxLabel}>
                  {t('onboarding.profession.cantFind')}
                </ThemedText>
                <Checkbox.Android
                  status={cantFind ? 'checked' : 'unchecked'}
                  color={theme.primary}
                  uncheckedColor={theme.mutedText}
                />
              </Pressable>

              <Input
                placeholder={t('onboarding.profession.customPlaceholder')}
                value={custom}
                onChangeText={(text) => {
                  setError(false);
                  setCustom(text);
                }}
                error={error && cantFind && !custom.trim()}
              />
            </View>

            <Button
              mode="contained"
              icon="chevron-right"
              contentStyle={styles.continueContent}
              style={styles.continueButton}
              onPress={handleContinue}
            >
              {t('onboarding.profession.continue')}
            </Button>
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
  card: {
    marginTop: vs(16),
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
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
  continueButton: {
    marginTop: vs(24),
  },
});
