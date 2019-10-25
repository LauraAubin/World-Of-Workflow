import React, { useState } from 'react';

import { ModalTypes, Quest } from '../types';

interface Props {
  children: React.ReactNode;
}

type shownModalType = ModalTypes | Quest | undefined;

export const ModalContext = React.createContext({
  show: undefined as shownModalType,
  onChange: (() => {}) as (modalToShow: shownModalType) => void
});

export function ModalContextProvider({ children }: Props) {
  const [shownModal, setShownModal] = useState<shownModalType>(undefined);

  const determineModalToShow = (modalToShow: shownModalType) => {
    // since you can consecutively open a new quest modal
    const questsNeverToggle = modalToShow === ModalTypes.Quest;

    const alreadyShown = modalToShow === shownModal;

    const toggleModal =
      alreadyShown && !questsNeverToggle ? undefined : modalToShow;

    setShownModal(toggleModal);
  };

  return (
    <ModalContext.Provider
      value={{ show: shownModal, onChange: determineModalToShow }}
    >
      {children}
    </ModalContext.Provider>
  );
}
