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
      const incompleteRecords = args.filter(record => !record.completed);

      const newRecords =
        JSON.stringify(records) !== JSON.stringify(incompleteRecords);

      if (newRecords) {
        setRecords(incompleteRecords);
      }
    });
  });

  const questRange = (start: Date, end: Date) => {
    const filterRecords = records.filter(
      record =>
        new Date(record.dueDate) >= start && new Date(record.dueDate) <= end
    );

    return filterRecords;
  };

  const questSection = (title: string, records: QuestType[]) =>
    records.length > 0 && (
      <QuestSection key={title} title={title} records={records} />
    );

  const renderDailyQuests = (title: string, dueDate: Date) => {
    const filterRecords = records.filter(
      record => simpleDate(new Date(record.dueDate)) === simpleDate(dueDate)
    );

    return questSection(title, filterRecords);
  };

  const renderThisWeek = () => {
    const records = questRange(newDate('after-tomorrow'), newDate('friday'));

    return questSection('This week', records);
  };

  const renderThisWeekend = () => {
    const today = new Date().getDay();
    const friday = 5;
    const saturday = 6;

    const omitSaturdayIfTodayIsFriday = (dueDate: string) =>
      today === friday && new Date(dueDate).getDay() !== saturday;

    const filterRecords = questRange(
      newDate('saturday'),
      newDate('sunday')
    ).filter(record => omitSaturdayIfTodayIsFriday(record.dueDate));

    return questSection('This weekend', filterRecords);
  };

  const renderNextWeek = () => {
    const records = questRange(newDate('next-monday'), newDate('next-friday'));

    return questSection('Next week', records);
  };

  const renderRemainingQuests = (title: string, after: Date) => {
    const filterRecords = records.filter(
      record => new Date(record.dueDate) > after
    );

    return questSection(title, sortAscending(filterRecords));
  };

  const renderPreviousQuests = (title: string, before: Date) => {
    const filterRecords = records.filter(
      record => new Date(record.dueDate) < before
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
        {todayIsBeforeThursday && renderThisWeek()}
        {renderThisWeekend()}
        {renderNextWeek()}
        {renderRemainingQuests('Later', newDate('next-friday'))}
      </div>
    </div>
  );
}

function sortAscending(array) {
  const exactDate = object => new Date(object.dueDate).getTime();

  array.sort(function(x, y) {
    return exactDate(x) - exactDate(y);
  });

  return array;
}
