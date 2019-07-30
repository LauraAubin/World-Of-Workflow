import React from 'react';

import './Image.scss';

interface Props {
  image: { element: string; height?: number };
  overlay?: {
    element: string | object;
    height?: number;
    x?: number;
    y?: number;
  };
}

export default function Image({ image, overlay }: Props) {
  const imageStyle = {
    height: `${image.height}.px`
  };

  return (
    <div className='imageContainer'>
      {overlay && overlayElement(overlay)}
      <img src={image.element} style={imageStyle} />
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
