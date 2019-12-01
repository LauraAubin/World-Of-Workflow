import React, { useContext } from 'react';

import { ModalContext } from '../../../../context/modal';

import Tabs from './Tabs';
import CreateQuest from './CreateQuest';
import AdminSettings from './AdminSettings';
import Button from '../../../universalElements/Button';
import Typography from '../../../universalElements/Typography';

import Paper from '../../../../art/ActionItems/GM/TabIcons/paper.png';
import Wow from '../../../../art/ActionItems/GM/TabIcons/wow.png';

import './GM.scss';

export default function GM() {
  const modalContext = useContext(ModalContext);

  return (
    <div className='container' id='mainElement'>
      <Typography type='content' styles='gmTitle'>
        Game Master
      </Typography>

      <div className='gmCloseButton'>
        <Button minimize onClick={() => modalContext.onChange(undefined)} />
      </div>

      <Tabs
        tabs={[
          { title: 'Create Quest', icon: Paper, content: <CreateQuest /> },
          { title: 'Admin Settings', icon: Wow, content: <AdminSettings /> }
        ]}
      />
    </div>
  );
}
