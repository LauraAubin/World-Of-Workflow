import React, { useEffect, useContext } from 'react';

import { ModalTypes } from '../../../types';
import { ModalContext } from '../../../context/modal';

import Actionbar from '../../pageElements/Actionbar';
import ActionItems from '../../pageElements/ActionItems';
import Minimap from '../../pageElements/Minimap';
import Modal from '../../pageElements/Modal';
import CharacterFrame from '../../pageElements/CharacterFrame';
import QuestList from '../../pageElements/QuestList';

import Grid from '../Grid';
import Flex from '../Flex';

import './Layout.scss';

export default function Layout() {
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [modalContext.show]);

  const handleKeyPress = event => {
    if (event.key === 'g') {
      const activeElementClasses =
        document.activeElement && document.activeElement.className;

      const userIsTyping =
        activeElementClasses && activeElementClasses.includes('textInput');

      !userIsTyping && modalContext.onChange(ModalTypes.GM);
    }
  };

  const actionsMarkup = (
    <Flex columnOrientation horizontalAlignment='right' id='mainElement'>
      <div className='absoluteForeground'>
        <Flex horizontalAlignment='space-between'>
          <Actionbar />
        </Flex>
      </div>
      <Flex horizontalAlignment='right' verticalAlignment='bottom'>
        <ActionItems />
      </Flex>
    </Flex>
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
