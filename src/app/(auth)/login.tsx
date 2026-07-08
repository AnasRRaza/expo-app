import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/use-auth-store';

export default function LoginScreen() {
  const setSession = useAuthStore((state) => state.setSession);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <Button
        mode="contained"
        onPress={() => setSession({ userId: 'dev-user', token: 'dev-token' })}
      >
        Sign In (dev)
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
