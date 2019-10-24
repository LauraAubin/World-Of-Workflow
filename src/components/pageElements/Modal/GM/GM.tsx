import React from 'react';

import CreateQuest from './CreateQuest';
import Button from '../../../universalElements/Button';

import './GM.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  closeModal(): void;
}

export default function GM({ closeModal }: Props) {
  const deleteRecords = condition => {
    ipcRenderer.send('deleteRecords', {
      where: condition
    });
  };

  const dumpTestData = () => {
    deleteRecords({ test: true });
    closeModal();
  };

  return (
    <div className='container' id='mainElement'>
      <div className='gmCloseButton'>
        <Button minimize onClick={closeModal} />
      </div>

      <div className='options'>
        <button>Create Quest</button>
        <button onClick={dumpTestData}>Dump all test data</button>
      </div>

      <div className='selectedOptionContainer'>
        <CreateQuest closeModal={closeModal} />
      </div>
    </div>
  );
}
