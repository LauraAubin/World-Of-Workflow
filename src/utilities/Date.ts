import moment from 'moment';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August', 
  'September',
  'October',
  'November',
  'December'
];

export function simpleDate(d: Date) {
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const TODAY = new Date();

export const TOMORROW = new Date(
  moment()
    .add('1', 'd')
    .toDate()
);

export const NEXT_WEEK = new Date(
  moment()
    .add('1', 'w')
    .toDate()
);
