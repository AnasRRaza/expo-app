import React from 'react';
import { Button as ThemeButton } from 'react-native-paper';

import { Colors } from '@/constants/theme';

interface ButtonProps extends React.ComponentProps<typeof ThemeButton> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ThemeButton
      textColor={props.mode === 'outlined' ? Colors.light.primary : Colors.white}
      {...props}
      style={[styles.button, props.style]}
    >
      {children}
    </ThemeButton>
  );
};

const styles = {
  button: {
    borderRadius: 10,
  },
};

export default Button;
