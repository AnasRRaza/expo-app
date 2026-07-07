import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

describe('ThemedText', () => {
  it('renders the given text', async () => {
    await render(<ThemedText>Hello</ThemedText>);

    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
