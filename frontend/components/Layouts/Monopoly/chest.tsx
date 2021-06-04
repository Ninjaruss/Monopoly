import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { theme } from '@utils';

import { Text } from '@components/DataDisplay';

import { ChestContainer } from './style';

const Chest = (): JSX.Element => {
  return (
    <ChestContainer>
      <Text align="center" variant="small" color="#000">
        COMMUNITY CHEST
      </Text>
      <FontAwesomeIcon
        icon={faBriefcase}
        color={theme.cvar('colorPropertySkyblue')}
        size="3x"
      />
    </ChestContainer>
  );
};

export default Chest;
