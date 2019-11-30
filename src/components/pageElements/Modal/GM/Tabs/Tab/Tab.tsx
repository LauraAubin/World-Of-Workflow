import React from 'react';

import classNames from 'classnames';

import Typography from '../../../../../universalElements/Typography';

import '../Tabs.scss';

interface Props {
  title: string;
  icon: string;
  selected: boolean;
  setSelectedTab(tabTitle): void;
}

export default function Tab({ title, icon, selected, setSelectedTab }: Props) {
  const styles = classNames('tab', selected && 'selectedTab');

  return (
    <div className={styles} onClick={() => setSelectedTab(title)}>
      <div className='tabIconBackground' />
      <div style={{ backgroundImage: `url(${icon})` }} className='tabIcon' />

      <Typography type='content' styles='tabText'>
        {title}
      </Typography>
    </div>
  );
}
