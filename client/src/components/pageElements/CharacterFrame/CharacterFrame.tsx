import React, { useState } from 'react';

import classNames from 'classnames';

import './CharacterFrame.scss';

interface Props {
  name?: string;
}

export default function CharacterFrame({ name = 'Laura' }: Props) {
  const [flipGravatar] = useState(true);

  const gravatarStyles = classNames(
    'gravatarImage',
    flipGravatar && 'flipGravatar'
  );

  return (
    <div className='portraitFrame' id='mainElement'>
      <div className={gravatarStyles} />
      <div className='name'>{name}</div>
      <div className='iconFrame'>
        <div className='iconResting' />
      </div>
    </div>
  );
}
