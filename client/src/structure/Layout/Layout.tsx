import * as React from 'react';

import Actionbar from '../../components/Actionbar';
import Minimap from '../../components/Minimap';
import Nameplate from '../../components/Nameplate';
import QuestList from '../../components/QuestList';

import Grid from '../Grid';

export default class Layout extends React.Component {
  public render() {
    return (
      <Grid columns={`1fr 1fr`} rows={`1fr 1fr 1fr`}>
        <Grid.Section
          spanColumns={{ start: 1, end: 2 }}
          spanRows={{ start: 1, end: 2 }}
        >
          <Nameplate />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 2, end: 3 }}
          spanRows={{ start: 1, end: 2 }}
        >
          <Minimap />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 2, end: 3 }}
          spanRows={{ start: 2, end: 3 }}
        >
          <QuestList />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 1, end: 3 }}
          spanRows={{ start: 3, end: 4 }}
        >
          <Actionbar />
        </Grid.Section>
      </Grid>
    );
  }
}
