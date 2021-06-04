import { faLightbulb, faFaucet } from '@fortawesome/free-solid-svg-icons';

import { theme } from '@utils';
import { Square, SquareType } from '@types';

const SQUARES: Square[] = [
  {
    type: SquareType.PLACE,
    place: 'Pacific Avenue',
    price: 300,
    side: 'right',
    color: theme.cvar('colorPropertyGreen'),
    position: 31,
  },
  {
    type: SquareType.PLACE,
    place: 'North Carolina Avenue',
    price: 300,
    side: 'right',
    color: theme.cvar('colorPropertyGreen'),
    position: 32,
  },
  { type: SquareType.CHEST, side: 'right', position: 33 },
  {
    type: SquareType.PLACE,
    place: 'Pennsylvania Avenue',
    price: 320,
    side: 'right',
    color: theme.cvar('colorPropertyGreen'),
    position: 34,
  },
  {
    type: SquareType.STATION,
    side: 'right',
    price: 200,
    place: 'Short Line',
    position: 35,
  },
  {
    type: SquareType.CHANCE,
    side: 'right',
    color: theme.cvar('colorChanceOrange'),
    position: 36,
  },
  {
    type: SquareType.PLACE,
    place: 'Park Place',
    price: 350,
    side: 'right',
    color: theme.cvar('colorPropertyBlue'),
    position: 37,
  },
  {
    type: SquareType.TAX,
    side: 'right',
    price: 100,
    place: 'Luxury Tax',
    position: 38,
  },
  {
    type: SquareType.PLACE,
    place: 'Boardwalk',
    price: 400,
    side: 'right',
    color: theme.cvar('colorPropertyBlue'),
    position: 39,
  },
  {
    type: SquareType.CORNER,
    position: 30,
  },
  {
    type: SquareType.PLACE,
    place: 'Kentucky Avenue',
    price: 220,
    side: 'top',
    color: theme.cvar('colorPropertyRed'),
    position: 21,
  },
  {
    type: SquareType.CHANCE,
    side: 'top',
    color: theme.cvar('colorChanceBlue'),
    position: 22,
  },
  {
    type: SquareType.PLACE,
    place: 'Indiana Avenue',
    price: 220,
    side: 'top',
    color: theme.cvar('colorPropertyRed'),
    position: 23,
  },
  {
    type: SquareType.PLACE,
    place: 'Illinois Avenue',
    price: 240,
    side: 'top',
    color: theme.cvar('colorPropertyRed'),
    position: 24,
  },
  {
    type: SquareType.STATION,
    side: 'top',
    price: 200,
    place: 'B. & O. Railroad',
    position: 25,
  },
  {
    type: SquareType.PLACE,
    place: 'Atlantic Avenue',
    price: 260,
    side: 'top',
    color: theme.cvar('colorPropertyYellow'),
    position: 26,
  },
  {
    type: SquareType.PLACE,
    place: 'Ventnor Avenue',
    price: 260,
    side: 'top',
    color: theme.cvar('colorPropertyYellow'),
    position: 27,
  },
  {
    type: SquareType.UTILITY,
    side: 'top',
    place: 'Water Works',
    price: 150,
    icon: faFaucet,
    color: theme.cvar('colorChanceBlue'),
    position: 28,
  },
  {
    type: SquareType.PLACE,
    place: 'Marvin Avenue',
    price: 280,
    side: 'top',
    color: theme.cvar('colorPropertyYellow'),
    position: 29,
  },
  {
    type: SquareType.CORNER,
    position: 20,
  },
  {
    type: SquareType.PLACE,
    place: 'New York Avenue',
    price: 200,
    side: 'left',
    color: theme.cvar('colorPropertyOrange'),
    position: 19,
  },
  {
    type: SquareType.PLACE,
    place: 'Tennessee Avenue',
    price: 180,
    side: 'left',
    color: theme.cvar('colorPropertyOrange'),
    position: 18,
  },
  { type: SquareType.CHEST, side: 'left', position: 17 },
  {
    type: SquareType.PLACE,
    place: 'St. James Place',
    price: 180,
    side: 'left',
    color: theme.cvar('colorPropertyOrange'),
    position: 16,
  },
  {
    type: SquareType.STATION,
    side: 'left',
    price: 200,
    place: 'Pennsylvania Railroad',
    position: 15,
  },
  {
    type: SquareType.PLACE,
    place: 'Virginia Avenue',
    price: 160,
    side: 'left',
    color: theme.cvar('colorPropertyPink'),
    position: 14,
  },
  {
    type: SquareType.PLACE,
    place: 'States Avenue',
    price: 140,
    side: 'left',
    color: theme.cvar('colorPropertyPink'),
    position: 13,
  },
  {
    type: SquareType.UTILITY,
    side: 'left',
    place: 'Electric Company',
    price: 150,
    icon: faLightbulb,
    color: theme.cvar('colorTax'),
    position: 12,
  },
  {
    type: SquareType.PLACE,
    place: 'St. Charles Place',
    price: 140,
    side: 'left',
    color: theme.cvar('colorPropertyPink'),
    position: 11,
  },
  {
    type: SquareType.CORNER,
    position: 10,
  },
  {
    type: SquareType.PLACE,
    place: 'Connecticut Avenue',
    price: 120,
    side: 'bottom',
    color: theme.cvar('colorPropertySkyblue'),
    position: 9,
  },
  {
    type: SquareType.PLACE,
    place: 'Vermont Avenue',
    price: 100,
    side: 'bottom',
    color: theme.cvar('colorPropertySkyblue'),
    position: 8,
  },
  {
    type: SquareType.CHANCE,
    side: 'bottom',
    color: theme.cvar('colorChancePink'),
    position: 7,
  },
  {
    type: SquareType.PLACE,
    place: 'Oriental Avenue',
    price: 100,
    side: 'bottom',
    color: theme.cvar('colorPropertySkyblue'),
    position: 6,
  },
  {
    type: SquareType.STATION,
    side: 'bottom',
    price: 200,
    place: 'Reading Railroad',
    position: 5,
  },
  {
    type: SquareType.TAX,
    side: 'bottom',
    price: 200,
    place: 'Income Tax',
    position: 4,
  },
  {
    type: SquareType.PLACE,
    place: 'Baltic Avenue',
    price: 60,
    side: 'bottom',
    color: theme.cvar('colorPropertyBrown'),
    position: 3,
  },
  { type: SquareType.CHEST, side: 'bottom', position: 2 },
  {
    type: SquareType.PLACE,
    place: 'Mediterranean Avenue',
    price: 60,
    side: 'bottom',
    color: theme.cvar('colorPropertyBrown'),
    position: 1,
  },
  {
    type: SquareType.CORNER,
    position: 0,
  },
];

export default SQUARES;