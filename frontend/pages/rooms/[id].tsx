import * as React from 'react';
import { useRouter } from 'next/router';
import socketIOClient from 'socket.io-client';

import { Container, Monopoly } from '@components/Layouts';
import { GameActions, GameProvider, useGame } from '@contexts/GameContext';
import { Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

// const players = [
// { id: 'p1', name: 'Player 1', color: '#d4c5e2', cash: 1500 },
// { id: 'p1', name: 'Player 1', color: '#ffe8d1', balance: 1500, position: 0 },
// { id: 'p2', name: 'Player 2', color: '#a7e2e3', cash: 1500, position: 0 },
// { id: 'p3', name: 'Player 3', color: '#c9d7f8', cash: 1500, position: 0 },
// { id: 'p4', name: 'Player 4', color: '#80cfa9', cash: 1500, position: 0 },
// ];

interface BoardProps {
  room: string;
}
const Board = ({ room }: BoardProps): JSX.Element => {
  const [game, dispatch] = useGame();

  React.useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_API_URL as string);
    if (socket) {
      socket.emit('joinRoom', room);
    }

    return () => {
      socket.disconnect();
    };
  }, [room]);

  // React.useEffect(() => {
  // dispatch({ type: GameActions.UPDATE_PLAYERS, props: { players } });
  // dispatch({
  //   type: GameActions.UPDATE_ACTIVE_PLAYER,
  //   props: { activePlayer: players[0] },
  // });
  // }, [dispatch]);

  const rollDice = React.useCallback(() => {
    return Math.floor(Math.random() * (12 - 2 + 1)) + 2;
  }, []);

  return (
    <Container justify="space-between">
      <Container align="center">
        <Text variant="h2">Scoreboard</Text>
        {game.players.map((p) => (
          <Text key={p.id} variant="h5" color={p.color}>
            {`${p.name}: $${p.balance}M`}
          </Text>
        ))}
      </Container>
      <Container flex={0} row>
        <Button
          disabled={game.activePlayer.id !== game.me.id}
          onClick={() => {
            dispatch({
              type: GameActions.UPDATE_DICE,
              props: { dice: rollDice() },
            });
          }}
        >
          Roll Dice
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: GameActions.BUY,
              props: {},
            });
          }}
          disabled={
            !game.isBuyable ||
            (game.squares.find((s) => s.position === game.activePlayer.position)
              ?.price as number) > game.activePlayer.balance
          }
        >
          Buy
        </Button>
      </Container>
    </Container>
  );
};

const Room = (): JSX.Element => {
  const { query } = useRouter();

  if (!query.id) {
    return <></>;
  }

  return (
    <GameProvider>
      <Container gap={0} row align="stretch">
        <Monopoly />
        <Board room={query.id as string} />
      </Container>
    </GameProvider>
  );
};

export default Room;
