import React, { useState } from 'react';

import classNames from 'classnames';

import Button from '../../../art/Buttons/Button.png';
import ButtonHover from '../../../art/Buttons/ButtonHover.png';
import ButtonPressed from '../../../art/Buttons/ButtonPressed.png';
import Minimize from '../../../art/Buttons/Minimize.png';

import './Button.scss';

interface Props {
  children?: string;
  /* A button with an x, used for close actions */
  minimize?: boolean;
  /* A button saying "Complete quest" */
  completeQuest?: boolean;
  onClick(): void;
}

export function Btn({ minimize, completeQuest, onClick, children }: Props) {
  const defaultImage = (minimize && Minimize) || Button;

  const [image, setImage] = useState(defaultImage);

  const styles = classNames(
    'button',
    minimize && 'minimize',
    completeQuest && 'completeQuest'
  );

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setImage((minimize && Minimize) || ButtonHover)}
      onMouseDown={() => setImage((minimize && Minimize) || ButtonPressed)}
      onMouseUp={() => setImage((minimize && Minimize) || Button)}
      onMouseLeave={() => setImage((minimize && Minimize) || Button)}
      className={styles}
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </button>
  );
}
