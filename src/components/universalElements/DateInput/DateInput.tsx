import React, { useState, useEffect } from 'react';

import { simpleDate } from '../../../utilities/Date';
import { TODAY } from '../../../utilities/Date';

interface Props {
  onChange(Date): void;
}

export default function DateInput({ onChange }: Props) {
  const [date, setDate] = useState(simpleDate(TODAY));

  useEffect(() => {
    const alwaysIncludeYear = isYearProvided()
      ? date
      : `${date} ${TODAY.getFullYear()}`;

    onChange(new Date(alwaysIncludeYear));
  }, [date]);

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
