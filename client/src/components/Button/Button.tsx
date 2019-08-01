import React, { useState } from 'react';

import Image from '../Image';

import Button from '../../art/Buttons/Button.png';
import ButtonHover from '../../art/Buttons/ButtonHover.png';
import ButtonPressed from '../../art/Buttons/ButtonPressed.png';

import './Button.scss';

interface Props {
  width?: number;
  onClick(): void;
  children: string;
}

export function Btn({ width = 100, onClick, children }: Props) {
  const [image, setImage] = useState(Button);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setImage(ButtonHover)}
      onMouseDown={() => setImage(ButtonPressed)}
      onMouseUp={() => setImage(Button)}
      onMouseLeave={() => setImage(Button)}
      className='Button'
    >
      <Image
        content={{ element: image, height: 25, width }}
        overlay={{
          element: <span>{children}</span>,
          y: 8
        }}
      />
    </button>
  );
}
