import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faCar,
  faHandPaper,
  faPlay,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import { theme, uuid } from '@utils';
import { SquareType } from '@types';

import { Text } from '@components/DataDisplay';
import { Container } from '@components/Layouts';

import { useGame } from '@contexts/GameContext';

import {
  Board,
  Row,
  Space,
  Center,
  Parking,
  BaseContainer,
  GoToJail,
  Start,
  Jail,
} from './style';
import Property from './property';
import Chance from './chance';
import Station from './station';
import Tax from './tax';
import Utility from './utility';
import Chest from './chest';

type Direction = 'horizontal' | 'vertical';
type Location = 'top' | 'bottom' | 'right' | 'left';

const Monopoly = (): JSX.Element => {
  const [{ activePlayer, dice, squares }] = useGame();
  const sides = React.useMemo(
    () => [
      { direction: 'horizontal', location: 'top' },
      { direction: 'horizontal', location: 'bottom' },
      { direction: 'vertical', location: 'left' },
      { direction: 'vertical', location: 'right' },
    ],
    [],
  );

  return (
    <Board>
      <Center>
        <Text variant="h2" color="#000">
          MONOPOLY
        </Text>
        <Text variant="p" color="#000" size="18px">
          Dice:&nbsp;
          <Text variant="small" size="18px" color="#000">
            {dice}
          </Text>
        </Text>
      </Center>

      <Space
        bg={activePlayer?.position === 20 ? activePlayer.color : undefined}
      >
        <Parking>
          <BaseContainer>
            <Text variant="small" color="#000">
              FREE
            </Text>
            <FontAwesomeIcon
              icon={faCar}
              color={theme.cvar('colorPropertyRed')}
              size="5x"
            />
            <Text variant="small" color="#000">
              PARKING
            </Text>
          </BaseContainer>
        </Parking>
      </Space>

      <Space
        bg={activePlayer?.position === 30 ? activePlayer.color : undefined}
      >
        <GoToJail>
          <BaseContainer>
            <Text variant="small" color="#000">
              GO TO
            </Text>
            <FontAwesomeIcon
              icon={faHandPaper}
              color={theme.cvar('colorPropertyBlue')}
              size="5x"
            />
            <Text variant="small" color="#000">
              JAIL
            </Text>
          </BaseContainer>
        </GoToJail>
      </Space>

      <Space
        bg={activePlayer?.position === 10 ? activePlayer.color : undefined}
      >
        <Jail>
          <BaseContainer>
            <Container
              bg={theme.cvar('colorPropertyOrange')}
              flex="0 50%"
              gap={0}
            >
              <Text variant="small" color="#000" align="center">
                IN JAIL
              </Text>
              <FontAwesomeIcon icon={faLock} color="#000" size="2x" />
            </Container>
            <Container flex="0 50%" gap={0}>
              <Text variant="small" color="#000" align="center">
                JUST VISITING
              </Text>
            </Container>
          </BaseContainer>
        </Jail>
      </Space>

      <Space bg={activePlayer?.position === 0 ? activePlayer.color : undefined}>
        <Start>
          <BaseContainer>
            <Text variant="small" color="#000" align="center">
              COLLECT
              <br />
              $200M SALARY
              <br />
              AS YOU PASS
            </Text>
            <FontAwesomeIcon icon={faPlay} color="#000" size="3x" />
          </BaseContainer>
        </Start>
      </Space>

      {sides.map((side) => (
        <Row
          key={side.location}
          direction={side.direction as Direction}
          location={side.location as Location}
        >
          {squares
            .filter((s) => s.side === side.location)
            .map((square) => {
              const bg =
                activePlayer?.position === square.position
                  ? activePlayer.color
                  : undefined;

              switch (square.type) {
                case SquareType.PLACE: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Property
                        place={square.place as string}
                        price={`$${square.price}`}
                        color={square.color as string}
                      />
                    </Space>
                  );
                }
                case SquareType.CHANCE: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Chance color={square.color as string} />
                    </Space>
                  );
                }
                case SquareType.STATION: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Station name={square.place as string} />
                    </Space>
                  );
                }
                case SquareType.TAX: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Tax
                        price={square.price as number}
                        name={square.place as string}
                      />
                    </Space>
                  );
                }
                case SquareType.UTILITY: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Utility
                        color={square.color as string}
                        icon={square.icon as IconDefinition}
                        price={square.price as number}
                        name={square.place as string}
                      />
                    </Space>
                  );
                }
                case SquareType.CHEST: {
                  return (
                    <Space key={square.position} bg={bg}>
                      <Chest />
                    </Space>
                  );
                }
                default:
                  return <div key={uuid()} />;
              }
            })}
        </Row>
      ))}
    </Board>
  );
};

export default Monopoly;
