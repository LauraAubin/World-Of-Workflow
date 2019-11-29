import React, { useState, useEffect } from 'react';

import Tab from './Tab';

import './Tabs.scss';

interface Props {
  tabs: { title: string; icon: string; content: React.ReactNode }[];
}

export default function Tabs({ tabs }: Props) {
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    setSelectedTab(tabs[0].title);
  }, []);

  const tabList = (
    <div className='tabList'>
      {tabs.map(tab => (
        <Tab
          title={tab.title}
          icon={tab.icon}
          selected={tab.title == selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </div>
  );

  const tabContent = tabs.map(
    tab =>
      tab.title == selectedTab && (
        <div className='selectedTabContent'>{tab.content}</div>
      )
  );

  return (
    <>
      {tabList}
      {tabContent}
    </>
  );
}
