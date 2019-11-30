import * as React from 'react';

import Typography from '../../universalElements/Typography';

import './Minimap.scss';

export default function Minimap() {
  return (
    <div className='minimapContainer' id='mainElement'>
      <div className='frame'>
        <Typography type='content' color='green' size='small' styles='location'>
          Shopify - 150 Elgin
        </Typography>
        <div className='mapArea' />
      </div>
    </div>
  );
}
