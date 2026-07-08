import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';

export default function ProfessionalStatusScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Professional Status</ThemedText>
      <Link href="/self-employed-type" asChild>
        <Button mode="contained">Continue</Button>
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
