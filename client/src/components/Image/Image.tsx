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
  const x = overlay ? overlay.x : 0;
  const y = overlay ? overlay.y : 0;

  const imageStyle = {
    height: `${image.height}.px`
  };

  const overlayStyle = {
    paddingLeft: x,
    paddingTop: y
  };

  const overlayImageStyle = { height: `${overlay && overlay.height}px` };

  const overlayElement =
    typeof overlay!.element == 'string' ? (
      <img src={overlay!.element} style={overlayImageStyle} />
    ) : (
      overlay!.element
    );

  return (
    <div className='imageContainer'>
      <div className='overlay' style={overlayStyle}>
        {overlay && overlayElement}
      </div>
      <img src={image.element} style={imageStyle} />
    </div>
  );
}
