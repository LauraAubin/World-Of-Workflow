import * as React from 'react';

import Actionbar from '../../components/Actionbar';
import ActionItems from '../../components/ActionItems';
import Minimap from '../../components/Minimap';
import Modal from '../../components/Modal';
import Nameplate from '../../components/Nameplate';
import QuestList from '../../components/QuestList';

import Grid from '../Grid';

import './Layout.scss';

const actionsMarkup = (
  <div className='attachToBottom'>
    <div className='absoluteContainer'>
      <div className='center'>
        <Actionbar />
      </div>
    </div>
    <div className='rightAlign'>
      <ActionItems />
    </div>
  </div>
);

export default function Layout() {
  return (
    <Grid columns={`1fr 50% 1fr`} rows={`10% 1fr 10%`}>
      <Grid.Section
        spanColumns={{ start: 1, end: 2 }}
        spanRows={{ start: 1, end: 2 }}
      >
        <Nameplate />
      </Grid.Section>

      <Grid.Section
        spanColumns={{ start: 3, end: 4 }}
        spanRows={{ start: 1, end: 2 }}
      >
        <Minimap />
      </Grid.Section>

      <Grid.Section
        spanColumns={{ start: 2, end: 3 }}
        spanRows={{ start: 2, end: 3 }}
      >
        <Modal />
      </Grid.Section>

      <Grid.Section
        spanColumns={{ start: 3, end: 4 }}
        spanRows={{ start: 2, end: 3 }}
      >
        <QuestList />
      </Grid.Section>

      <Grid.Section
        spanColumns={{ start: 1, end: 4 }}
        spanRows={{ start: 3, end: 4 }}
      >
        {actionsMarkup}
      </Grid.Section>
    </Grid>
  );
}
