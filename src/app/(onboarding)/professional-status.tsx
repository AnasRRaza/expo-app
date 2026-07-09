import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';

export default function ProfessionalStatusScreen() {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('onboarding.professionalStatus.title')}</ThemedText>
      <Link href="/self-employed-type" asChild>
        <Button mode="contained">{t('onboarding.professionalStatus.continue')}</Button>
      </Link>
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
