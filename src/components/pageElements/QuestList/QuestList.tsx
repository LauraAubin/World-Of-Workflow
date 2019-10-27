import React, { useState, useEffect } from 'react';

import { simpleDate, newDate } from '../../../utilities/Date';
import { Quest as QuestType } from '../../../types';

import QuestSection from './components/QuestSection';

import './QuestList.scss';

const { ipcRenderer } = window.require('electron');

export default function QuestList() {
  const [records, setRecords] = useState<QuestType[]>([]);

  useEffect(() => {
    ipcRenderer.send('readFrom', { table: 'quest' });
    ipcRenderer.once('readFromReply', (event, args) => {
      const newRecords = JSON.stringify(records) !== JSON.stringify(args);

      if (newRecords) {
        setRecords(args);
      }
    });
  });

  const questSection = (title: string, records: QuestType[]) =>
    records.length > 0 && (
      <QuestSection key={title} title={title} records={records} />
    );

  const renderDailyQuests = (title: string, dueDate: Date) => {
    const filterRecords = records.filter(
      record =>
        simpleDate(new Date(record.dueDate)) === simpleDate(dueDate) &&
        !record.completed
    );

    return questSection(title, filterRecords);
  };

  const renderQuestRange = (title: string, start: Date, end: Date) => {
    const saturday = 6;
    const sunday = 0;

    const filterRecords = records.filter(
      record =>
        new Date(record.dueDate) >= start &&
        new Date(record.dueDate) <= end &&
        new Date(record.dueDate).getDay() !== saturday &&
        new Date(record.dueDate).getDay() !== sunday &&
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

  const renderPreviousQuests = (title: string, before: Date) => {
    const filterRecords = records.filter(
      record => new Date(record.dueDate) < before && !record.completed
    );

    return questSection(title, filterRecords);
  };

  const todayIsBeforeThursday = newDate().getDay() < 4;

  return (
    <div className='alignRight'>
      <div className='stack' id='mainElement'>
        {renderPreviousQuests('Past', newDate('yesterday'))}
        {renderDailyQuests('Today', newDate())}
        {renderDailyQuests('Tomorrow', newDate('tomorrow'))}
        {todayIsBeforeThursday &&
          renderQuestRange(
            'This week',
            newDate('after-tomorrow'),
            newDate('friday')
          )}
        {renderQuestRange(
          'This weekend',
          newDate('saturday'),
          newDate('sunday')
        )}
        {renderQuestRange(
          'Next week',
          newDate('next-monday'),
          newDate('next-friday')
        )}
        {renderRemainingQuests('Later', newDate('next-friday'))}
      </div>
    </div>
  );
}
