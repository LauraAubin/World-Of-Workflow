import React, { useState } from 'react';

import { writeTo, deleteRecords } from '../../../../utilities/Database';

import DateInput from '../../DateInput';

import './GM.scss';

export default function GM() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [questObjectives, setQuestObjectives] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [test, setTest] = useState(false);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    name == 'title' && setTitle(value);
    name == 'location' && setLocation(value);
    name == 'description' && setDescription(value);
    name == 'questObjectives' && setQuestObjectives(value);
  };

  const submit = () => {
    writeTo('quest', {
      title,
      location,
      description,
      questObjectives,
      dueDate,
      completed: false,
      test
    });
  };

  return (
    <div className='container' id='mainElement'>
      <div>
        Title
        <input name='title' value={title} onChange={handleChange} />
      </div>

      <div>
        Location
        <input name='location' value={location} onChange={handleChange} />
      </div>

      <div>
        Description
        <textarea
          name='description'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div>
        Quest Objectives
        <input
          name='questObjectives'
          value={questObjectives}
          onChange={handleChange}
        />
      </div>

      <div>
        <DateInput onChange={setDueDate} />
      </div>

      <div>
        <input type='checkbox' onClick={() => setTest(!test)} />
        Test
      </div>

      <button onClick={submit}>Submit</button>

      <br />

      <button onClick={() => deleteRecords({ test: true })}>
        Dump all test data
      </button>
    </div>
  );
}
