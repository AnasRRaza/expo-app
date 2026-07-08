import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface InputProps extends React.ComponentProps<typeof PaperTextInput> {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  containerStyle,
  style,
  outlineStyle,
  outlineColor,
  activeOutlineColor,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <ThemedText type="small">{label}</ThemedText> : null}
      <PaperTextInput
        mode="outlined"
        style={[styles.input, style]}
        outlineStyle={[styles.outline, outlineStyle]}
        outlineColor={outlineColor ?? theme.backgroundSelected}
        activeOutlineColor={activeOutlineColor ?? theme.primary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  input: {
    backgroundColor: 'transparent',
  },
  outline: {
    borderRadius: 12,
  },
});

const Input = InputComponent as typeof InputComponent & {
  Icon: typeof PaperTextInput.Icon;
};
Input.Icon = PaperTextInput.Icon;

export default Input;
