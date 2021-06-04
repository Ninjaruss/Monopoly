import * as React from 'react';

import { StyledContainer, StyledContainerProps } from './style';

interface ContainerProps extends Partial<StyledContainerProps> {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Container = ({
  children,
  flex = 'auto',
  row = false,
  reverse = false,
  noWrap = false,
  justify = 'flex-start',
  align = row ? 'center' : 'stretch',
  bg = 'transparent',
  gap = 3,
  style,
}: ContainerProps): JSX.Element => {
  return (
    <StyledContainer
      {...{
        flex,
        row,
        reverse,
        noWrap,
        justify,
        align,
        gap,
        bg,
        children,
        style,
      }}
    />
  );
};

export default Container;
