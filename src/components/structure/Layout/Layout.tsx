import React, { useState, useEffect } from 'react';

import { Quest, ModalTypes } from '../../../types';

import Actionbar from '../../pageElements/Actionbar';
import ActionItems from '../../pageElements/ActionItems';
import Minimap from '../../pageElements/Minimap';
import Modal from '../../pageElements/Modal';
import CharacterFrame from '../../pageElements/CharacterFrame';
import QuestList from '../../pageElements/QuestList';

import Grid from '../Grid';

import './Layout.scss';

export default function Layout() {
  const [shownModal, setShownModal] = useState<ModalTypes | undefined>(
    undefined
  );
  const [selectedQuest, setSelectedQuest] = useState<Quest | undefined>(
    undefined
  );

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [shownModal]);

  const handleKeyPress = event => {
    if (event.key === 'g') {
      const activeElementClasses =
        document.activeElement && document.activeElement.className;

      const userIsTyping =
        activeElementClasses && activeElementClasses.includes('textInput');

      !userIsTyping && determineModalToShow(ModalTypes.GM);
    }
  };

  const determineModalToShow = (modalToShow: ModalTypes) => {
    const questsNeverToggle = modalToShow === ModalTypes.Quest; // since you can consecutively open a new quest modal
    const alreadyShown = modalToShow === shownModal;

    const toggleModal =
      alreadyShown && !questsNeverToggle ? undefined : modalToShow;

    setShownModal(toggleModal);
  };

  const showSelectedQuest = (selectedQuest: Quest) => {
    setSelectedQuest(selectedQuest);
    setShownModal(ModalTypes.Quest);
  };

  const actionsMarkup = (
    <div className='attachToBottom' id='mainElement'>
      <div className='absoluteContainer'>
        <Actionbar />
      </div>
      <div className='rightAlign'>
        <ActionItems setShownModal={determineModalToShow} />
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
          shownModal={shownModal}
          selectedQuest={selectedQuest}
          setShownModal={determineModalToShow}
        />
      </Grid.Section>

      <Grid.Section
        spanColumns={{ start: 3, end: 4 }}
        spanRows={{ start: 2, end: 3 }}
      >
        <QuestList setSelectedQuest={showSelectedQuest} />
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
