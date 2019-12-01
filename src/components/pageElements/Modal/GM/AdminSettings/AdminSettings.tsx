import React, { useState, useContext } from 'react';

import { ModalContext } from '../../../../../context/modal';
import { AdminSettingsContext } from '../../../../../context/adminSettings';

import Checkbox from '../../../../universalElements/Checkbox';
import Typography from '../../../../universalElements/Typography';
import Flex from '../../../../structure/Flex';

const { ipcRenderer } = window.require('electron');

export default function AdminSettings() {
  const modalContext = useContext(ModalContext);
  const adminSettingsContext = useContext(AdminSettingsContext);

  const deleteRecords = condition => {
    ipcRenderer.send('deleteRecords', {
      where: condition
    });
  };

  const dumpTestData = () => {
    deleteRecords({ test: true });
    modalContext.onChange(undefined);
  };

  const inlineEditing = adminSettingsContext.inlineEditing;

  return (
    <div>
      <Flex verticalAlignment='center'>
        <Checkbox
          checked={inlineEditing}
          onClick={() => adminSettingsContext.setInlineEditing(!inlineEditing)}
        />
        <Typography type='content' color='white'>
          Allow inline editing
        </Typography>
      </Flex>
      <button onClick={dumpTestData}>Dump all test data</button>
    </div>
  );
}
