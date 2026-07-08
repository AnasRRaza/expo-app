import React from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { s } from 'react-native-size-matters';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface InputProps extends React.ComponentProps<typeof PaperTextInput> {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
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
        style={[{ backgroundColor: theme.inputBackground }, style]}
        outlineStyle={[styles.outline, outlineStyle]}
        outlineColor={outlineColor ?? theme.inputBorder}
        activeOutlineColor={activeOutlineColor ?? theme.primary}
        {...props}
      />
      {props.error && props.errorMessage ? (
        <ThemedText type="small" style={styles.errorText}>
          {props.errorMessage}
        </ThemedText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  outline: {
    borderRadius: s(12),
  },
  errorText: {
    marginLeft: s(2),
    color: Colors.red,
  },
});

const Input = InputComponent as typeof InputComponent & {
  Icon: typeof PaperTextInput.Icon;
};
Input.Icon = PaperTextInput.Icon;

export default Input;
