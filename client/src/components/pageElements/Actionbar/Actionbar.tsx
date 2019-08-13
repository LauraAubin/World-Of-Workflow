import React from 'react';

import autobind from 'autobind-decorator';

import './Actionbar.scss';

const GRIFFIN_WIDTH = 150;
const GRIFFIN_HEIGHT = 110;
const GRIFFIN_NECK_WIDTH = GRIFFIN_WIDTH / 4.5;

interface State {
  mouseX?: number;
}

export default class Actionbar extends React.Component<{}, State> {
  constructor(state: State) {
    super(state);
    this.state = { mouseX: undefined };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.click);
  }

  render() {
    const { mouseX } = this.state;

    const griffinSize = {
      width: `${GRIFFIN_WIDTH}px`,
      height: `${GRIFFIN_HEIGHT}px`
    };

    const determineX = mouseX && mouseX - GRIFFIN_WIDTH + GRIFFIN_NECK_WIDTH;

    return (
      <>
        <div
          className='griffin leftGriffin'
          style={{
            ...griffinSize,
            left: determineX
          }}
        />
        <div
          className='griffin rightGriffin'
          style={{
            ...griffinSize,
            right: determineX
          }}
        />
      </>
    );
  }

  @autobind
  private click(event) {
    const griffinHeightArea = window.innerHeight - GRIFFIN_HEIGHT;
    const halfScreenWidth = window.innerWidth / 2;

    const isWithinClickBoundary =
      event.clientY > griffinHeightArea && event.clientX < halfScreenWidth;

    isWithinClickBoundary && this.setState({ mouseX: event.clientX });
  }
}
