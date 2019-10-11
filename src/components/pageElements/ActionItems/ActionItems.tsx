import * as React from 'react';

import { ModalTypes, ActionItems as ActionItemsType } from '../../../types';

import Button from '../../universalElements/Button';

import './ActionItems.scss';

interface Props {
  setShownModal(ModalTypes): void;
}

export default function ActionItems({ setShownModal }: Props) {
  return (
    <div className='Container'>
      <div className='Button'>
        <Button
          actionItem={ActionItemsType.GM}
          onClick={() => setShownModal(ModalTypes.GM)}
        />
      </div>
    </div>
  );
}
