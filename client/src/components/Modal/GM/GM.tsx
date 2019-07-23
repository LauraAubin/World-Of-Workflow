import React, { useState } from 'react';

import { writeTo } from '../../../utilities/Database';

import DateInput from '../../DateInput';

import './GM.scss';

export default function GM() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    name == 'title' && setTitle(value);
    name == 'location' && setLocation(value);
    name == 'shortDescription' && setShortDescription(value);
    name == 'longDescription' && setLongDescription(value);
  };

  const submit = () => {
    writeTo('quest', {
      title,
      location,
      shortDescription,
      longDescription,
      dueDate,
      test: true
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
        Short description
        <input
          name='shortDescription'
          value={shortDescription}
          onChange={handleChange}
        />
      </div>

      <div>
        Long description
        <textarea
          name='longDescription'
          value={longDescription}
          onChange={handleChange}
        />
      </div>

      <div>
        <DateInput onChange={setDueDate} />
      </div>

      <button onClick={submit}>Submit</button>
    </div>
  );
}
