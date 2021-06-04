import * as React from 'react';

import { Text } from '@components/DataDisplay';
import { Container } from '@components/Layouts';

import { PropertyBar, PropertyContainer } from './style';

interface PropertyProps {
  place: string;
  price: string;
  color: string;
}

const Property = ({ place, price, color }: PropertyProps): JSX.Element => {
  return (
    <PropertyContainer>
      <PropertyBar bg={color} />
      <Text align="center" variant="small" color="#000">
        {place.toUpperCase()}
      </Text>
      <Container flex={0}>
        <Text align="center" variant="small" color="#000">{`${price}M`}</Text>
      </Container>
    </PropertyContainer>
  );
};

export default Property;
