import React, { useState, useEffect } from 'react';

import { simpleDate, newDate } from '../../../utilities/Date';

import TextInput from '../TextInput';

interface Props {
  className?: string;
  maxLength?: number;
  onChange(Date): void;
}

export default function DateInput({ className, maxLength, onChange }: Props) {
  const [date, setDate] = useState(simpleDate(newDate()));

  useEffect(() => {
    const alwaysIncludeYear = isYearProvided(date)
      ? date
      : `${date} ${newDate().getFullYear()}`;

    onChange(new Date(alwaysIncludeYear));
  }, [date, onChange]);

  const handleChange = value => {
    setDate(value);
  };

  return (
    <TextInput
      className={className}
      maxLength={maxLength}
      defaultValue={date}
      handleChange={handleChange}
    />
  );
}

function isYearProvided(date: string) {
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
}
