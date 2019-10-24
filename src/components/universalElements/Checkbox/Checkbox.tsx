import React from 'react';

import CheckboxEmpty from '../../../art/Checkbox/CheckboxEmpty.png';
import CheckboxSelected from '../../../art/Checkbox/CheckboxSelected.png';

import './Checkbox.scss';

interface Props {
  checked: boolean;
  onClick(): void;
}

export default function Checkbox({ checked, onClick }: Props) {
  const image = checked ? CheckboxSelected : CheckboxEmpty;

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className='checkbox'
      onClick={onClick}
    />
  );
}
