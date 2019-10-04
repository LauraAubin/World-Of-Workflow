import React, { useState, useEffect } from 'react';

import {
  simpleDate,
  TODAY,
  TOMORROW,
  NEXT_WEEK
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
