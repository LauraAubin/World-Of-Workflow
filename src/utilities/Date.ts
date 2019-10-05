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

export const YESTERDAY = new Date(
  moment()
    .subtract('1', 'd')
    .toDate()
);

export const TODAY = new Date();
export const TOMORROW = generateDate({ quantity: '1', value: 'd' });
export const AFTER_TOMORROW = generateDate({ quantity: '2', value: 'd' });
export const FRIDAY = generateDate(undefined, 'Sunday');
export const SATURDAY = generateDate(undefined, 'Saturday');
export const SUNDAY = generateDate({ quantity: '1', value: 'w' }, 'Sunday');
export const NEXT_FRIDAY = generateDate(
  { quantity: '1', value: 'w' },
  'Friday'
);

// Current minutes/seconds are preserved
function generateDate(add?: { quantity: string; value: string }, day?: string) {
  const newMoment = add
    ? moment().add(add.quantity as any, add.value)
    : moment();

  const specifyDay = day ? newMoment.day(day) : newMoment;

  return new Date(specifyDay.toDate());
}
