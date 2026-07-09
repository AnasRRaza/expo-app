import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/use-auth-store';

export default function SelfEmployedTypeScreen() {
  const { t } = useTranslation();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('onboarding.selfEmployedType.title')}</ThemedText>
      <Button mode="contained" onPress={completeOnboarding}>
        {t('onboarding.selfEmployedType.finishDev')}
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
});
