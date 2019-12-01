import * as React from 'react';

import Typography from '../../universalElements/Typography';
import Flex from '../../structure/Flex';

import './Minimap.scss';

export default function Minimap() {
  return (
    <div className='minimapContainer' id='mainElement'>
      <Flex horizontalAlignment='right'>
        <div className='frame'>
          <Typography
            type='content'
            color='green'
            size='small'
            styles='location'
          >
            Shopify - 150 Elgin
          </Typography>
          <div className='mapArea' />
        </div>
      </Flex>
    </div>
  );
}
