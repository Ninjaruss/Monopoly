import styled, { css } from 'styled-components';

export const Board = styled.div`
  display: grid;
  grid-template-columns:
    calc(100vh * 0.125 - 2px) repeat(9, calc(75vh / 9 - 2px))
    calc(100vh * 0.125 - 2px);
  grid-template-rows:
    calc(100vh * 0.125 - 2px) repeat(9, calc(75vh / 9 - 2px))
    calc(100vh * 0.125 - 2px);
  grid-gap: 2px;
  width: 100vh;
  height: 100vh;
  background: #000;
  //border: 2px solid #000;
`;

export const Center = styled.div`
  grid-column: 2 / 11;
  grid-row: 2 / 11;
  background: #fafaf8;
  display: grid;
  //grid-template-columns: repeat(7, 1fr);
  //grid-template-rows: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
`;

type RowProps = {
  direction: 'vertical' | 'horizontal';
  location: 'top' | 'bottom' | 'left' | 'right';
};

export const Row = styled.div<RowProps>`
  display: grid;
  grid-gap: 2px;
  overflow-wrap: anywhere;
  grid-template-columns: ${({ direction }) =>
    direction === 'horizontal' ? 'repeat(9, calc(75vh / 9 - 2px))' : '100%'};

  grid-template-rows: ${({ direction }) =>
    direction === 'horizontal' ? '100%' : 'repeat(9, calc(75vh / 9 - 2px))'};

  ${({ direction }) =>
    direction === 'vertical' &&
    css`
      div > div:first-child {
        top: 50%;
        left: 50%;
      }
    `}

  ${({ location }) => {
    switch (location) {
      case 'top': {
        return css`
          grid-column: 2 / 11;
          grid-row: 1;
          > * {
            transform: rotate(180deg);
          }
        `;
      }
      case 'bottom': {
        return css`
          grid-column: 2 / 11;
          grid-row: 11;
        `;
      }
      case 'left': {
        return css`
          grid-column: 1;
          grid-row: 2 / 11;

          > div > div {
            transform: translate(-50%, -50%) rotate(90deg);
          }
        `;
      }
      case 'right': {
        return css`
          grid-column: 11;
          grid-row: 2 / 11;

          > div > div {
            transform: translate(-50%, -50%) rotate(270deg);
          }
        `;
      }
      default: {
        return undefined;
      }
    }
  }}
`;

export const TopRow = styled.div`
  grid-column: 2 / 11;
  grid-row: 1;
`;

export const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transform-origin: center;
  height: calc(100vh * 0.125 - 2px);
  width: calc(75vh / 9 - 2px);
`;

export const ChanceContainer = styled(BaseContainer)`
  justify-content: space-evenly;
  align-items: center;
`;

export const StationContainer = styled(ChanceContainer)``;

export const TaxContainer = styled(ChanceContainer)``;

export const UtilityContainer = styled(ChanceContainer)``;

export const ChestContainer = styled(ChanceContainer)``;

export const PropertyContainer = styled(BaseContainer)``;

type PropertyBarProps = {
  bg: string;
};

export const PropertyBar = styled.div<PropertyBarProps>`
  display: flex;
  flex: 0 25%;
  background-color: ${({ bg }) => bg};
  border-bottom: 2px solid #000;
`;

type SpaceProps = {
  bg?: string;
};

export const Space = styled.div<SpaceProps>`
  text-align: center;
  background-color: ${({ bg }) => bg ?? '#fff'};
`;

export const Parking = styled.div`
  grid-column: 1;
  grid-row: 1 / 2;

  div {
    transform: rotate(135deg);
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

export const GoToJail = styled.div`
  grid-column: 11;
  grid-row: 1 / 1;

  div {
    transform: rotate(225deg);
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

export const Jail = styled.div`
  grid-column: 1;
  grid-row: 11 / 12;

  div {
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
`;

export const Start = styled.div`
  grid-column: 1;
  grid-row: 1 / 1;

  div {
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;
