import * as React from 'react';

import './QuestList.scss';

export default function QuestList() {
  const quest = (
    <div className='questContainer'>
      <div>?</div>
      <div className='questDetails'>
        <div>Title</div>
        <div>Quest objectives</div>
      </div>
    </div>
  );

  return (
    <div className='alignRight'>
      <div className='stack'>
        <div className='questTitle'>Quests</div>
        {quest}
        {quest}
        {quest}
      </div>
    </div>
  );
}
