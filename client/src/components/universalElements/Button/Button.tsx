import React, { useState } from 'react';

import Image from '../Image';

import Button from '../../../art/Buttons/Button.png';
import ButtonHover from '../../../art/Buttons/ButtonHover.png';
import ButtonPressed from '../../../art/Buttons/ButtonPressed.png';
import Minimize from '../../../art/Buttons/Minimize.png';

import './Button.scss';

interface Props {
  children?: string;
  minimize?: boolean;
  width?: number;
  height?: number;
  onClick(): void;
}

export function Btn({
  minimize,
  width = 100,
  height = 25,
  onClick,
  children
}: Props) {
  const defaultImage = (minimize && Minimize) || Button;

  const [image, setImage] = useState(defaultImage);

  const overlayMarkup = children
    ? {
        element: <span>{children}</span>,
        y: 8
      }
    : undefined;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setImage((minimize && Minimize) || ButtonHover)}
      onMouseDown={() => setImage((minimize && Minimize) || ButtonPressed)}
      onMouseUp={() => setImage((minimize && Minimize) || Button)}
      onMouseLeave={() => setImage((minimize && Minimize) || Button)}
      className='Button'
    >
      <Image
        content={{ element: image, width, height }}
        overlay={overlayMarkup}
      />
    </button>
  );
}
