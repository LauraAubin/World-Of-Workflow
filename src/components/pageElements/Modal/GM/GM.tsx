import React from 'react';

import CreateQuest from './CreateQuest';
import Button from '../../../universalElements/Button';

import './GM.scss';

interface Props {
  closeModal(): void;
}

export default function GM({ closeModal }: Props) {
  return (
    <div className='container' id='mainElement'>
      <div className='gmCloseButton'>
        <Button minimize onClick={closeModal} />
      </div>

      <div className='options'>
        <button>Create Quest</button>
      </div>

      <div className='selectedOptionContainer'>
        <CreateQuest closeModal={closeModal} />
      </div>
    </div>
  );
}
