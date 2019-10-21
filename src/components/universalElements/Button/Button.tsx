import React, { useState } from 'react';

import classNames from 'classnames';

import Typography from '../../universalElements/Typography';

import Button from '../../../art/Buttons/Button.png';
import ButtonHover from '../../../art/Buttons/ButtonHover.png';
import ButtonPressed from '../../../art/Buttons/ButtonPressed.png';

import Minimize from '../../../art/Buttons/Minimize.png';

import ActionItemGM from '../../../art/ActionItems/ActionItem-GM.png';
import ActionItemGMPressed from '../../../art/ActionItems/ActionItem-GMPressed.png';

import { ActionItems } from '../../../types';

import './Button.scss';

enum ImageKeys {
  regular = 'regular',
  minimize = 'minimize',
  GMAction = 'GMAction'
}

enum ImageStates {
  default = 'default',
  hover = 'hover',
  pressed = 'pressed'
}

const IMAGES = {
  regular: {
    default: Button,
    hover: ButtonHover,
    pressed: ButtonPressed
  },
  minimize: {
    default: Minimize
  },
  GMAction: {
    default: ActionItemGM,
    pressed: ActionItemGMPressed
  }
};

interface Props {
  onClick(): void;
  children?: string;
  /* Increases the size of the default button */
  large?: boolean;
  /* A button with an x, used for close actions */
  minimize?: boolean;
  /* A button showing an icon, used for sections with many interactions */
  actionItem?: ActionItems;
}

export function Btn({ large, minimize, actionItem, onClick, children }: Props) {
  const determineImageToUse =
    (minimize && ImageKeys.minimize) ||
    (actionItem === ActionItems.GM && ImageKeys.GMAction) ||
    ImageKeys.regular;

  const getImagePath = (state: ImageStates) => {
    return (
      IMAGES[determineImageToUse][state] ||
      IMAGES[determineImageToUse][ImageStates.default]
    );
  };

  const [image, setImage] = useState<string>(getImagePath(ImageStates.default));

  const modifierStyles = classNames(
    minimize && 'minimize',
    actionItem && 'actionItem'
  );
  const styles = classNames('button', large ? 'large' : modifierStyles);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setImage(getImagePath(ImageStates.hover))}
      onMouseDown={() => setImage(getImagePath(ImageStates.pressed))}
      onMouseUp={() => setImage(getImagePath(ImageStates.default))}
      onMouseLeave={() => setImage(getImagePath(ImageStates.default))}
      className={styles}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Typography type='content'>{children}</Typography>
    </button>
  );
}
