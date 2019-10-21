import React, { useEffect } from 'react';

import './TextInput.scss';

interface Props {
  defaultValue?: string;
  handleChange(value: string): void;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

export default function TextInput({
  defaultValue,
  handleChange,
  className,
  placeholder,
  maxLength
}: Props) {
  useEffect(() => {
    if (defaultValue) {
      const element = document.getElementById(defaultValue);

      if (element) {
        element.textContent = defaultValue;
      }
    }
  }, []);

  const maxTypingLength = event => {
    const textLength = event.target.textContent.length;
    const key = event.key;

    if (
      textLength === maxLength &&
      key !== 'Backspace' &&
      key !== 'ArrowUp' &&
      key !== 'ArrowRight' &&
      key !== 'ArrowDown' &&
      key !== 'ArrowLeft'
    ) {
      event.preventDefault();
    }
  };

  const preventOverPasting = event => {
    const textLength = event.target.textContent.length;
    if (maxLength && textLength > maxLength) {
      event.target.textContent = event.target.textContent.substring(
        0,
        maxLength
      );
    }
  };

  const onKeyUp = event => {
    preventOverPasting(event);
    handleChange(event.target.textContent);
  };

  return (
    <div
      contentEditable
      id={defaultValue}
      className={`textInput ${className}`}
      data-text={placeholder}
      onKeyDown={maxTypingLength}
      onKeyUp={onKeyUp}
    />
  );
}
