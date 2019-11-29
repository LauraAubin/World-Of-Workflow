import React, { useState, useEffect, useContext } from 'react';

import { newDate } from '../../../../../utilities/Date';
import { headerText } from '../../Quest/Quest';
import { ModalContext } from '../../../../../context/modal';

import Button from '../../../../universalElements/Button';
import Checkbox from '../../../../universalElements/Checkbox';
import DateInput from '../../../../universalElements/DateInput';
import TextInput from '../../../../universalElements/TextInput';
import Typography from '../../../../universalElements/Typography';

import './CreateQuest.scss';
import '../../Quest/Quest.scss';

const { ipcRenderer } = window.require('electron');

export default function CreateQuest() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [questObjectives, setQuestObjectives] = useState('');
  const [dueDate, setDueDate] = useState(newDate());
  const [test, setTest] = useState(false);

  const modalContext = useContext(ModalContext);

  useEffect(() => {
    ipcRenderer.send('testEnvironment');
    ipcRenderer.once('testEnvironmentReply', (event, args) => {
      setTest(args);
    });
  }, []);

  const submit = () => {
    ipcRenderer.send('writeTo', {
      table: 'quest',
      contents: {
        title,
        location,
        description,
        questObjectives,
        dueDate,
        completed: false,
        test
      }
    });

    modalContext.onChange(undefined);
  };

  const contentMarkup = (
    <>
      <Typography type='heading' color='black'>
        <TextInput
          placeholder='Title...'
          maxLength={50}
          handleChange={setTitle}
          className='questContentHeaderText textHoverGlow'
        />
      </Typography>

      <Typography type='content' color='black'>
        <TextInput
          placeholder='Description...'
          maxLength={300}
          handleChange={setDescription}
          className='questContentDescriptionText textHoverGlow'
        />
      </Typography>

      {headerText('Quest Objectives')}

      <Typography type='content' color='black'>
        <TextInput
          placeholder='Objectives...'
          maxLength={200}
          handleChange={setQuestObjectives}
          className='questContentDescriptionText textHoverGlow'
        />
      </Typography>

      <Typography type='content' color='black'>
        <div className='questDueDateText oneLine'>
          Due on&nbsp;
          <DateInput
            maxLength={40}
            onChange={setDueDate}
            className='textHoverGlow'
          />
        </div>
      </Typography>
    </>
  );

  return (
    <div className='createQuestContainer'>
      <div className='createQuestBackground'>
        <div className='contentArea createQuestContentArea'>
          {contentMarkup}
        </div>
      </div>

      <Button large onClick={submit}>
        Submit
      </Button>

      <div className='testElements'>
        <Checkbox checked={test} onClick={() => setTest(!test)} />
        <Typography type='content' styles='testText'>
          Create test quest
        </Typography>
      </div>
    </div>
  );
}
