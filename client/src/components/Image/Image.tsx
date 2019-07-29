import React from 'react';

import './Image.scss';

interface Props {
  text?: any;
  textX?: number;
  textY?: number;
  children: any;
}

export default function Image({ text, textX = 0, textY = 0, children }: Props) {
  const textPosition = {
    paddingLeft: textX,
    paddingTop: textY
  };

  return (
    <div className='imageContainer'>
      <div className='text' style={textPosition}>
        {text}
      </div>
      <div>{children}</div>
    </div>
  );
}
