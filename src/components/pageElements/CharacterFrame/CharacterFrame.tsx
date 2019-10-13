import React, { useState } from 'react';

import classNames from 'classnames';

import './CharacterFrame.scss';

const MY_GRAVATOR =
  'https://s.gravatar.com/avatar/4dba733acf88e16eed06e2dfae2baf3a?s=80';

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
      <img
        src={MY_GRAVATOR}
        className={gravatarStyles}
        alt='User profile'
      />
      <div className='name'>{name}</div>
      <div className='iconFrame'>
        <div className='iconResting' />
      </div>
    </div>
  );
}
