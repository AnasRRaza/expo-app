import React from 'react';
import { Button as ThemeButton } from 'react-native-paper';

import { Colors } from '@/constants/theme';

interface ButtonProps extends React.ComponentProps<typeof ThemeButton> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ThemeButton
      style={styles.button}
      textColor={props.mode === 'outlined' ? Colors.light.primary : Colors.light.primary}
      {...props}
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
