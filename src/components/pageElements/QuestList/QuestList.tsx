import React, { useState, useEffect } from 'react';

import {
  simpleDate,
  YESTERDAY,
  TODAY,
  TOMORROW,
  AFTER_TOMORROW,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  NEXT_MONDAY,
  NEXT_FRIDAY
} from '../../../utilities/Date';
import { Quest as QuestType } from '../../../types';

import QuestSection from './components/QuestSection';

import './QuestList.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  setSelectedQuest(selectedQuest): void;
}

export default function QuestList({ setSelectedQuest }: Props) {
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
      <QuestSection
        key={title}
        title={title}
        records={records}
        setSelectedQuest={setSelectedQuest}
      />
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
    const filterRecords = records.filter(
      record =>
        new Date(record.dueDate) >= start &&
        new Date(record.dueDate) <= end &&
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

  const todayIsBeforeThursday = new Date().getDay() < 4;

  return (
    <div className='alignRight'>
      <div className='stack' id='mainElement'>
        {renderPreviousQuests('Overdue', YESTERDAY)}
        {renderDailyQuests('Today', TODAY)}
        {renderDailyQuests('Tomorrow', TOMORROW)}
        {todayIsBeforeThursday &&
          renderQuestRange('This week', AFTER_TOMORROW, FRIDAY)}
        {renderQuestRange('This weekend', SATURDAY, SUNDAY)}
        {renderQuestRange('Next week', NEXT_MONDAY, NEXT_FRIDAY)}
        {renderRemainingQuests('Later', NEXT_FRIDAY)}
      </div>
    </div>
  );
}
