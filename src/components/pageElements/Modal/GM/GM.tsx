import React, { useContext } from 'react';

import { ModalContext } from '../../../../context/modal';

import Tabs from './Tabs';
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

      <Tabs
        tabs={[
          { title: 'Create Quest', icon: '', content: <CreateQuest /> },
          {
            title: 'Admin settings',
            icon: '',
            content: <button onClick={dumpTestData}>Dump all test data</button>
          }
        ]}
      />
    </div>
  );
}
