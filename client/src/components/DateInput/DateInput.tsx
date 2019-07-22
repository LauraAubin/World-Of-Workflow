import React, { useState, useEffect } from 'react';

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
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const currentMonth = MONTHS[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const [date, setDate] = useState(
    `${currentMonth} ${currentDay}, ${currentYear}`
  );

  useEffect(() => {
    const alwaysIncludeYear = isYearProvided()
      ? date
      : `${date} ${currentYear}`;

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
