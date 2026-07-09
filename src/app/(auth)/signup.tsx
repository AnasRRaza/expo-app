import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/use-auth-store';

export default function SignupScreen() {
  const { t } = useTranslation();
  const setSession = useAuthStore((state) => state.setSession);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('signup.title')}</ThemedText>
      <Button
        mode="contained"
        onPress={() => setSession({ userId: 'dev-user', token: 'dev-token' })}
      >
        {t('signup.createAccountDev')}
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
