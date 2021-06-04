import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Square, SquareType } from '@types';

import SQUARES from './squares';

export enum GameActions {
  UPDATE_BALANCE = 'update_BALANCE',
  UPDATE_POSITION = 'update_position',
  UPDATE_ACTIVE_PLAYER = 'update_active_player',
  UPDATE_PLAYERS = 'update_players',
  UPDATE_DICE = 'update_dice',
  TURN = 'turn',
  BUY = 'buy',
}

interface Player {
  id: string;
  color: string;
  name: string;
  balance: number;
  position: number;
}

interface ActionProps {
  dice: number;
  me: Player;
  activePlayer: Player;
  players: Player[];
}

interface Action {
  type: string;
  props: Partial<ActionProps>;
}

type State = ActionProps & { squares: Square[]; isBuyable: boolean };

const me = {
  id: 'me',
  name: 'You',
  color: '#ffe8d1',
  balance: 1500,
  position: 0,
};

const initialState: State = {
  me,
  players: [me],
  dice: 0,
  activePlayer: me,
  squares: SQUARES,
  isBuyable: false,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const GameStateContext: React.Context<State> = React.createContext();
const GameDispatchContext: React.Context<
  React.Dispatch<Action>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
> = React.createContext();

const GameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case GameActions.UPDATE_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayer: action.props.activePlayer ?? state.activePlayer,
      };
    }
    case GameActions.UPDATE_PLAYERS: {
      return { ...state, players: action.props.players ?? state.players };
    }
    case GameActions.UPDATE_DICE: {
      const { dice } = action.props;
      const newPosition = state.activePlayer.position + (dice as number);
      const realPosition = newPosition > 39 ? newPosition - 40 : newPosition;
      const square = state.squares.find(
        (s) => s.position === realPosition,
      ) as Square;

      let newBalance =
        state.activePlayer.balance + (newPosition > 39 ? 200 : 0);
      const owner = { earnings: 0, id: '' };
      let isBuyable = false;

      switch (square.type) {
        case SquareType.TAX: {
          newBalance -= square.price as number;
          break;
        }
        case SquareType.CHANCE: {
          newBalance += 50;
          break;
        }
        case SquareType.STATION:
        case SquareType.PLACE:
        case SquareType.UTILITY: {
          if (square.owner) {
            if (square.owner !== state.me.id) {
              const rent = (square.price as number) * 0.1;

              owner.id = square.owner;
              newBalance -= rent;
              owner.earnings += newBalance >= rent ? rent : newBalance;
            }
          } else if (state.activePlayer.id === state.me.id) {
            isBuyable = true;
          }
          break;
        }
        default:
          break;
      }

      return {
        ...state,
        isBuyable,
        dice: dice ?? state.dice,
        activePlayer: {
          ...state.activePlayer,
          position: realPosition,
          balance: newBalance,
        },
        players: state.players.map((p) => {
          if (p.id === state.activePlayer.id) {
            return { ...p, position: realPosition, balance: newBalance };
          }
          if (p.id === owner.id) {
            return { ...p, balance: p.balance + owner.earnings };
          }
          return p;
        }),
      };
    }
    case GameActions.TURN: {
      const indexPlayer = state.players.indexOf(state.activePlayer);
      const newActiveUser = indexPlayer
        ? state.players[indexPlayer] ?? state.players[0]
        : state.players[0];

      return { ...state, dice: 0, activePlayer: newActiveUser };
    }
    case GameActions.BUY: {
      const square = state.squares.find(
        (s) => s.position === state.activePlayer.position,
      ) as Square;

      return {
        ...state,
        isBuyable: false,
        activePlayer: {
          ...state.activePlayer,
          balance: state.activePlayer.balance - (square.price as number),
        },
        players: state.players.map((p) =>
          p.id === state.activePlayer.id
            ? { ...p, balance: p.balance - (square.price as number) }
            : p,
        ),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const GameProvider: React.FC = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    GameReducer,
    initialState,
  );
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = (): State => {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useRegisterState must be used within a RegisterProvider');
  }
  return context;
};

export const useGameDispatch = (): React.Dispatch<Action> => {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useInsightDispatch must be used within a InsightProvider');
  }
  return context;
};

export const useGame = (): [State, React.Dispatch<Action>] => [
  useGameState(),
  useGameDispatch(),
];
