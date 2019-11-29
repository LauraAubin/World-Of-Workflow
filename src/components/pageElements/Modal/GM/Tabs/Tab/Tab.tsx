import React from 'react';

import classNames from 'classnames';

import '../Tabs.scss';

interface Props {
  title: string;
  icon: string;
  selected: boolean;
  setSelectedTab(tabTitle): void;
}

export default function Tab({ title, selected, setSelectedTab }: Props) {
  const styles = classNames('tab', selected && 'selectedTab');

  return (
    <div className={styles} onClick={() => setSelectedTab(title)}>
      {title}
    </div>
  );
}
