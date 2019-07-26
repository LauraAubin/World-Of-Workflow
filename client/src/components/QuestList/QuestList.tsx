import React, { useState } from 'react';

import { readFrom } from '../../utilities/Database';
import { simpleDate, TODAY, TOMORROW, NEXT_WEEK } from '../../utilities/Date';
import { Quest } from '../../types';

import './QuestList.scss';

interface Props {
  setSelectedQuest(selectedQuest): void;
}

export default function QuestList({ setSelectedQuest }: Props) {
  const [records, setRecords] = useState<Quest[]>([]);

  readFrom('quest').then(data => setRecords(data.records));

  const quest = (record: Quest) => (
    <div
      className='questContainer'
      key={record.created_at}
      onClick={() => setSelectedQuest(record)}
    >
      <div>?</div>
      <div className='questDetails'>
        <div>{record.title}</div>
        <div>{record.questObjectives}</div>
      </div>
    </div>
  );

  const questSection = (title: string, records: Quest[]) =>
    records.length > 0 && (
      <>
        <div className='questTitle'>{title}</div>
        {records.map(record => quest(record))}
      </>
    );

  const renderDailyQuests = (title: string, dueDate: Date) => {
    const filterRecords = records.filter(
      record => simpleDate(new Date(record.dueDate)) == simpleDate(dueDate)
    );

    return questSection(title, filterRecords);
  };

  const renderQuestRange = (title: string, start: Date, end: Date) => {
    const filterRecords = records.filter(
      record =>
        new Date(record.dueDate) > start && new Date(record.dueDate) < end
    );

    return questSection(title, filterRecords);
  };

  const renderRemainingQuests = (title: string, after: Date) => {
    const filterRecords = records.filter(
      record => new Date(record.dueDate) > after
    );

    return questSection(title, filterRecords);
  };

  return (
    <div className='alignRight'>
      <div className='stack' id='mainElement'>
        {renderDailyQuests('Today', TODAY)}
        {renderDailyQuests('Tomorrow', TOMORROW)}
        {renderQuestRange('This week', TOMORROW, NEXT_WEEK)}
        {renderRemainingQuests('Later', NEXT_WEEK)}
      </div>
    </div>
  );
}
