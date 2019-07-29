import React, { useState } from 'react';

import { readFrom } from '../../utilities/Database';
import { simpleDate, TODAY, TOMORROW, NEXT_WEEK } from '../../utilities/Date';
import { Quest } from '../../types';

import Frame from '../../art/QuestList/Frame.png';
import Image from '../Image';

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

  const questSectionTitle = (title: string) => (
    <div className='questTitle'>{title}</div>
  );

  const questSection = (title: string, records: Quest[]) =>
    records.length > 0 && (
      <>
        <Image text={questSectionTitle(title)} textX={25} textY={12}>
          <div className='questSectionImage'>
            <img src={Frame} className='questSectionImageFrame' />
          </div>
        </Image>
        {records.map(record => quest(record))}
      </>
    );

  const renderDailyQuests = (title: string, dueDate: Date) => {
    const filterRecords = records.filter(
      record =>
        simpleDate(new Date(record.dueDate)) == simpleDate(dueDate) &&
        !record.completed
    );

    return questSection(title, filterRecords);
  };

  const renderQuestRange = (title: string, start: Date, end: Date) => {
    const filterRecords = records.filter(
      record =>
        new Date(record.dueDate) > start &&
        new Date(record.dueDate) < end &&
        !record.completed
    );

    return questSection(title, filterRecords);
  };

  const renderRemainingQuests = (title: string, after: Date) => {
    const filterRecords = records.filter(
      record => new Date(record.dueDate) > after && !record.completed
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
