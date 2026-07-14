import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms, s, vs } from 'react-native-size-matters';

import { ScreenBackground } from '@/components/screen-background';
import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/use-auth-store';

export default function AccountCreatedScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return (
    <ScreenBackground style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.content}>
          <Icon source="check-circle-outline" size={s(64)} color={theme.primary} />

          <View style={styles.textBlock}>
            <ThemedText style={styles.title}>{t('onboarding.accountCreated.title')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
              {t('onboarding.accountCreated.subtitle')}
            </ThemedText>
          </View>

          <Button
            mode="contained"
            icon="chevron-right"
            contentStyle={styles.continueContent}
            style={styles.button}
            onPress={completeOnboarding}
          >
            {t('onboarding.accountCreated.continueToDashboard')}
          </Button>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(24),
    gap: vs(20),
  },
  textBlock: {
    alignItems: 'center',
    gap: vs(8),
  },
  title: {
    fontSize: ms(24),
    lineHeight: ms(32),
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '85%',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: vs(12),
  },
  continueContent: {
    flexDirection: 'row-reverse',
    paddingVertical: vs(6),
  },
});
