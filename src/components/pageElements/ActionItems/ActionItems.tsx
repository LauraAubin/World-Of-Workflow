import React, { useContext } from 'react';

import { ModalTypes, ActionItems as ActionItemsType } from '../../../types';
import { ModalContext } from '../../../context/modal';

import Button from '../../universalElements/Button';

import './ActionItems.scss';

export default function ActionItems() {
  const modalContext = useContext(ModalContext);

  return (
    <div className='Container'>
      <div className='Button'>
        <Button
          actionItem={ActionItemsType.GM}
          onClick={() => modalContext.onChange(ModalTypes.GM)}
        />
      </div>
    </div>
  );
}
