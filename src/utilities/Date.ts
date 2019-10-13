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

export function simpleDate(date: Date) {
  return moment(date).format('MMMM D, Y');
}

export function newDate(
  day?:
    | 'yesterday'
    | 'tomorrow'
    | 'after-tomorrow'
    | 'friday'
    | 'saturday'
    | 'sunday'
    | 'next-monday'
    | 'next-friday'
) {
  if (day === 'yesterday')
    return new Date(
      moment()
        .subtract('1', 'd')
        .toDate()
    );
  if (day === 'tomorrow') return generateDate({ quantity: '1', value: 'd' });
  if (day === 'after-tomorrow')
    return generateDate({ quantity: '2', value: 'd' });
  if (day === 'friday') return generateDate(undefined, 'Friday');
  if (day === 'saturday') return generateDate(undefined, 'Saturday');
  if (day === 'sunday')
    return generateDate({ quantity: '1', value: 'w' }, 'Sunday');
  if (day === 'next-monday')
    return generateDate({ quantity: '1', value: 'w' }, 'Monday');
  if (day === 'next-friday')
    return generateDate({ quantity: '1', value: 'w' }, 'Friday');

  return new Date();
}

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
