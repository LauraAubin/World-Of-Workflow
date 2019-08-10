import React from 'react';

import './Image.scss';

interface Props {
  content: { element: string; height?: number, width?: number };
  overlay?: {
    element: string | object;
    height?: number;
    x?: number;
    y?: number;
  };
}

export default function Image({ content, overlay }: Props) {
  const imageStyle = {
    height: `${content.height}.px`,
    width: `${content.width}.px`
  };

  return (
    <div className='imageContainer'>
      {overlay && overlayElement(overlay)}
      <img src={content.element} style={imageStyle} />
    </div>
  );
}

function overlayElement(overlay) {
  const imageStyle = { height: `${overlay.height}px` };

  const element =
    typeof overlay.element == 'string' ? (
      <img src={overlay.element} style={imageStyle} />
    ) : (
      overlay.element
    );

  const overlayStyle = {
    paddingLeft: overlay.x,
    paddingTop: overlay.y
  };

  return (
    <div className='overlay' style={overlayStyle}>
      {element}
    </div>
  );
}
