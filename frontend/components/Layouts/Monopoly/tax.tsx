import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import { theme } from '@utils';

import { Text } from '@components/DataDisplay';

import { TaxContainer } from './style';

interface TaxProps {
  name: string;
  price: number;
}

const Tax = ({ name, price }: TaxProps): JSX.Element => {
  return (
    <TaxContainer>
      <Text align="center" variant="small" color="#000">
        {name.toUpperCase()}
      </Text>
      <FontAwesomeIcon
        icon={faDollarSign}
        color={theme.cvar('colorTax')}
        size="3x"
      />
      <Text align="center" variant="small" color="#000">
        {`Pay $${price}M`}
      </Text>
    </TaxContainer>
  );
};

export default Tax;
