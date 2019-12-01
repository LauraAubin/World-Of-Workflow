import React, { useState, useContext } from 'react';

import { ModalContext } from '../../../../../context/modal';

import Checkbox from '../../../../universalElements/Checkbox';
import Typography from '../../../../universalElements/Typography';
import Flex from '../../../../structure/Flex';

const { ipcRenderer } = window.require('electron');

export default function AdminSettings() {
  const [enableInlineEditing, setInlineEditing] = useState(true);

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
    <div>
      <Flex verticalAlignment='center'>
        <Checkbox
          checked={enableInlineEditing}
          onClick={() => setInlineEditing(!enableInlineEditing)}
        />
        <Typography type='content' color='white'>
          Allow inline editing
        </Typography>
      </Flex>
      <button onClick={dumpTestData}>Dump all test data</button>
    </div>
  );
}
