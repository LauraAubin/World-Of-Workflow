import React from 'react';

import CreateQuest from './CreateQuest';

import './GM.scss';

interface Props {
  closeModal(): void;
}

export default function GM({ closeModal }: Props) {
  return (
    <div className='container' id='mainElement'>
      <div className='options'>
        <button>Create Quest</button>
      </div>
      <div className='selectedOption'>
        <CreateQuest closeModal={closeModal} />
      </div>
    </div>
  );
}
