import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import { Text } from '@components/DataDisplay';

import { ChanceContainer } from './style';

interface ChanceProps {
  color: string;
}

const Chance = ({ color }: ChanceProps): JSX.Element => {
  return (
    <ChanceContainer>
      <Text align="center" variant="small" color="#000">
        CHANCE
      </Text>
      <FontAwesomeIcon icon={faQuestion} color={color} size="5x" />
    </ChanceContainer>
  );
};

export default Chance;
