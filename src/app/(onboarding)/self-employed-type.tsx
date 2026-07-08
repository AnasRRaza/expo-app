import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/use-auth-store';

export default function SelfEmployedTypeScreen() {
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Self-Employed</ThemedText>
      <Button mode="contained" onPress={completeOnboarding}>
        Finish (dev)
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
