import React, { useState, useEffect } from 'react';

import { simpleDate } from '../../utilities/Date';

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

interface Props {
  onChange(Date): void;
}

export default function DateInput({ onChange }: Props) {
  const [date, setDate] = useState(simpleDate(new Date()));

  useEffect(() => {
    const alwaysIncludeYear = isYearProvided()
      ? date
      : `${date} ${new Date().getFullYear()}`;

    onChange(new Date(alwaysIncludeYear));
  });

  const handleChange = event => {
    setDate(event.target.value);
  };

  const isYearProvided = () => {
    if (date.includes(',')) return true;

    // g means to repeat this search through the entire string
    const removeSpaces = date.replace(/ /g, '');
    const removeLetters = removeSpaces.replace(/\D/g, '');

    // min year length = 2
    // min date length = 1
    if (removeLetters.length >= 3) {
      return true;
    }

    return false;
  };

  return <input value={date} onChange={handleChange} />;
}
