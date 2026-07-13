import React from 'react';
import { Button as ThemeButton } from 'react-native-paper';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ButtonProps extends React.ComponentProps<typeof ThemeButton> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const isOutlined = props.mode === 'outlined';

  return (
    <ThemeButton
      textColor={isOutlined ? theme.text : Colors.white}
      buttonColor={isOutlined ? theme.outlinedButtonBackground : undefined}
      {...props}
      style={[
        styles.button,
        isOutlined && { borderColor: theme.outlinedButtonBorder },
        props.style,
      ]}
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
