import React, { useContext } from 'react';

import { ModalContext } from '../../../../context/modal';

import CreateQuest from './CreateQuest';
import Button from '../../../universalElements/Button';

import './GM.scss';

const { ipcRenderer } = window.require('electron');

export default function GM() {
  const modalContext = useContext(ModalContext);

  const deleteRecords = condition => {
    ipcRenderer.send('deleteRecords', {
      where: condition
    });
  };

  const dumpTestData = () => {
    deleteRecords({ test: true });
    modalContext.onChange(undefined);
  };

  return (
    <div className='container' id='mainElement'>
      <div className='gmCloseButton'>
        <Button minimize onClick={() => modalContext.onChange(undefined)} />
      </div>

      <div className='options'>
        <button>Create Quest</button>
        <button onClick={dumpTestData}>Dump all test data</button>
      </div>

      <div className='selectedOptionContainer'>
        <CreateQuest />
      </div>
    </div>
  );
}
