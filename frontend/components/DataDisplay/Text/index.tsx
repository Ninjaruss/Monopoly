import * as React from 'react';

import { theme } from '@utils';

import { StyledText, StyledTextProps, FontWeight } from './style';

interface TextProps extends Partial<StyledTextProps> {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
}

const Text = ({
  children,
  variant,
  color = theme.cvar('colorForeground'),
  weight = theme.typography[variant].weight as FontWeight,
  italic = false,
  bold = false,
  align = 'left',
  size = theme.typography[variant].size,
}: TextProps): JSX.Element => {
  return (
    <StyledText
      size={size}
      color={color}
      weight={weight}
      italic={italic}
      bold={bold}
      align={align}
      as={variant}
    >
      {bold ? <b>{children}</b> : children}
    </StyledText>
  );
};

export default Text;
