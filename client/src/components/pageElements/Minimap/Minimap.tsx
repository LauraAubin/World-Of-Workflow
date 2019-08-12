import * as React from 'react';

import './Minimap.scss';

export default function Minimap() {
  return (
    <div className='minimapContainer' id='mainElement'>
      <div className='frame'>
        <div className='location'>Shopify - 150 Elgin</div>
        <div className='mapArea' />
      </div>
    </div>
  );
}
