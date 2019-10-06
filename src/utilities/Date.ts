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
export const FRIDAY = generateDate(undefined, 'Friday');
export const SATURDAY = generateDate(undefined, 'Saturday');
export const SUNDAY = generateDate({ quantity: '1', value: 'w' }, 'Sunday');
export const NEXT_MONDAY = generateDate(
  { quantity: '1', value: 'w' },
  'Monday'
);
export const NEXT_FRIDAY = generateDate(
  { quantity: '1', value: 'w' },
  'Friday'
);

function generateDate(add?: { quantity: string; value: string }, day?: string) {
  const simpleMomentDate = removeTimeFromDate(moment());

  const newMoment = add
    ? simpleMomentDate.add(add.quantity as any, add.value)
    : simpleMomentDate;

  const specifyDay = day ? newMoment.day(day) : newMoment;

  return new Date(specifyDay.toDate());
}

function removeTimeFromDate(momentObject) {
  return momentObject
    .set('h', 0)
    .set('m', 0)
    .set('s', 0)
    .set('ms', 0);
}
