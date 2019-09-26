import * as React from 'react';

import { Quest, ModalTypes } from '../../../types';

import autobind from 'autobind-decorator';

import Actionbar from '../../pageElements/Actionbar';
import ActionItems from '../../pageElements/ActionItems';
import Minimap from '../../pageElements/Minimap';
import Modal from '../../pageElements/Modal';
import CharacterFrame from '../../pageElements/CharacterFrame';
import QuestList from '../../pageElements/QuestList';

import Grid from '../Grid';

import './Layout.scss';

interface State {
  showModal: ModalTypes | undefined;
  selectedQuest?: Quest;
}

export default class Layout extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { showModal: undefined, selectedQuest: undefined };
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      if (event.key == 'g') {
        const element =
          document.activeElement && document.activeElement.nodeName;

        element == 'BODY' && this.setShownModal(ModalTypes.GM);
      }
    });
  }

  public render() {
    const { showModal, selectedQuest } = this.state;

    const actionsMarkup = (
      <div className='attachToBottom' id='mainElement'>
        <div className='absoluteContainer'>
          <Actionbar />
        </div>
        <div className='rightAlign'>
          <ActionItems setShownModal={this.setShownModal} />
        </div>
      </div>
    );

    return (
      <Grid columns={`1fr 50% 1fr`} rows={`20% 1fr 10%`}>
        <Grid.Section
          spanColumns={{ start: 1, end: 2 }}
          spanRows={{ start: 1, end: 2 }}
        >
          <CharacterFrame />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 3, end: 4 }}
          spanRows={{ start: 1, end: 2 }}
        >
          <Minimap />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 1, end: 4 }}
          spanRows={{ start: 2, end: 3 }}
        >
          <Modal
            showModal={showModal}
            selectedQuest={selectedQuest}
            setShownModal={this.setShownModal}
          />
        </Grid.Section>

        <Grid.Section
          spanColumns={{ start: 3, end: 4 }}
          spanRows={{ start: 2, end: 3 }}
        >
          <QuestList setSelectedQuest={this.setSelectedQuest} />
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

  @autobind
  public setShownModal(show: ModalTypes) {
    const { showModal } = this.state;

    const questsNeverToggle = show == ModalTypes.Quest;
    const alreadyShown = show == showModal;

    const toggleModal = alreadyShown && !questsNeverToggle ? undefined : show;

    this.setState({ showModal: toggleModal });
  }

  @autobind
  public setSelectedQuest(selectedQuest: Quest) {
    this.setState({ selectedQuest });

    this.setShownModal(ModalTypes.Quest);
  }
}