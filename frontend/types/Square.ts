import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export enum SquareType {
  PLACE,
  CHANCE,
  STATION,
  CORNER,
  UTILITY,
  CHEST,
  TAX,
}

export interface Square {
  type: SquareType;
  position: number;
  owner?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  icon?: IconDefinition;
  place?: string;
  price?: number;
  color?: string;
}
