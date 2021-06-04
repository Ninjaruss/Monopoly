import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrain } from '@fortawesome/free-solid-svg-icons';

import { Text } from '@components/DataDisplay';

import { StationContainer } from './style';

interface StationProps {
  name: string;
}

const Station = ({ name }: StationProps): JSX.Element => {
  return (
    <StationContainer>
      <Text align="center" variant="small" color="#000">
        {name.toUpperCase()}
      </Text>
      <FontAwesomeIcon icon={faTrain} color="#000" size="3x" />
      <Text align="center" variant="small" color="#000">
        $200M
      </Text>
    </StationContainer>
  );
};

export default Station;
