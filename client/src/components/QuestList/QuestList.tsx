import React, { useState } from 'react';

import { readFrom } from '../../utilities/Database';

import './QuestList.scss';

export default function QuestList() {
  const [records, setRecords] = useState([]);

  readFrom('quest').then(data => setRecords(data.records));

  const quest = record => (
    <div className='questContainer'>
      <div>?</div>
      <div className='questDetails'>
        <div>{record.title}</div>
        <div>{record.questObjectives}</div>
      </div>
    </div>
  );

  return (
    <div className='alignRight'>
      <div className='stack'>
        <div className='questTitle'>Quests</div>
        {records.map(record => quest(record))}
      </div>
    </div>
  );
}
