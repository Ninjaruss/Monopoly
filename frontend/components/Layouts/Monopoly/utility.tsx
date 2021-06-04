import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Text } from '@components/DataDisplay';

import { UtilityContainer } from './style';

interface TaxProps {
  name: string;
  price: number;
  icon: IconDefinition;
  color: string;
}

const Utility = ({ name, price, icon, color }: TaxProps): JSX.Element => {
  return (
    <UtilityContainer>
      <Text align="center" variant="small" color="#000">
        {name.toUpperCase()}
      </Text>
      <FontAwesomeIcon icon={icon} color={color} size="3x" />
      <Text align="center" variant="small" color="#000">
        {`$${price}M`}
      </Text>
    </UtilityContainer>
  );
};

export default Utility;
