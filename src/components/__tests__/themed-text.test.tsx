import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemePreferenceProvider } from '@/hooks/use-theme-preference';

describe('ThemedText', () => {
  it('renders the given text', async () => {
    await render(
      <ThemePreferenceProvider>
        <ThemedText>Hello</ThemedText>
      </ThemePreferenceProvider>,
    );

    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
