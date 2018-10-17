import React, { Component } from 'react';
import styled from 'styled-components';
import { getTextWidth } from './utils';

import BackIcon from 'react-svg-loader!./assets/arrow_back.svg';

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavIcon = styled(BackIcon)`
  fill: #fff;
  transform: rotate(${props => props.rotation || 0}deg);
  transition-duration: 0.3s;
`;

const TimerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TimerLabel = styled.label`
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  user-select: none;
`;

const TimeInputGroup = styled.div`
  position: absolute;
  top: -100%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%);
`;

const TimeInput = styled.input.attrs({
  type: 'text',
})`
  width: ${props => (props.width ? `${props.width}px` : '20px')};

  /* margin: 15px; */
  padding: 5px;
  text-align: center;

  border: none;
  /* border: 5px solid #ff8e72;
  border-radius: 15px; */

  background: none;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  font-weight: 200;
  outline: none;
  text-align: right;
`;

const ScrollButton = styled.div`
  position: relative;
  display: flex;

  padding: 5px 10px;
  align-items: center;
  justify-content: center;

  background: none;
  border: 5px solid #ff8e72;
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  user-select: none;
  transition-duration: 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: transparent;
    transform: scale(
      ${props =>
        props.direction === 'up' || props.direction === 'down'
          ? '1, 0'
          : '0, 1'}
    );
    transform-origin: ${props => directionToTransform(props.direction)};
    transition-duration: 0.3s;
    z-index: -1;
  }

  &:hover,
  &.active {
    color: #ff8e72;
  }

  &:hover ${NavIcon}, &.active ${NavIcon} {
    fill: #ff8e72;
  }

  &:hover:before,
  &.active:before {
    background: #fff;
    transform: scale(1.01);
  }
`;

function directionToTransform(direction) {
  switch (direction) {
    case 'left':
      return 'right center';
    case 'right':
      return 'left center';
    case 'up':
      return 'center bottom';
    case 'down':
      return 'center top';
  }
}

class Controls extends Component {
  constructor() {
    super();

    this.state = {
      timerValue: '1',
      timer: 1,
      timerWidth: 0,
    };

    this.handleTimerChange = this.handleTimerChange.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
  }

  handleTimerChange(e) {
    let val = e.currentTarget.value;
    let time = parseFloat(val);
    val = val.replace(/[^0-9.]/g, '');

    const style = window.getComputedStyle(e.currentTarget);

    const width = getTextWidth(val, style.font);

    this.setState({
      timerWidth: width,
      timerValue: val,
      timer: time,
    });
  }

  changeTimer() {
    const time = this.state.timer * 1000;
    if (this.state.timerValue === '') {
      this.setState({
        timerValue: '1',
      });
    }

    this.props.setTimerTick(time);
  }

  render() {
    return (
      <StyledControls>
        <ScrollButton onClick={this.props.prevChord} direction="left">
          <NavIcon /> Prev.
        </ScrollButton>
        <TimerContainer>
          <TimeInputGroup>
            <TimeInput
              onKeyDown={e => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
                  e.stopPropagation();
              }}
              onBlur={this.changeTimer}
              onChange={this.handleTimerChange}
              suppressContentEditableWarning={true}
              value={this.state.timerValue}
              width={this.state.timerWidth}
            />
            <TimerLabel>S</TimerLabel>
          </TimeInputGroup>
          <ScrollButton
            onClick={() => {
              this.props.toggleAutoScroll();
              !this.props.autoScrolling && this.props.nextChord();
            }}
            direction="up"
            className={this.props.autoScrolling ? 'active' : ''}
          >
            Auto Scroll
          </ScrollButton>
        </TimerContainer>
        <ScrollButton onClick={this.props.nextChord} direction="right">
          Next <NavIcon rotation="180" />
        </ScrollButton>
      </StyledControls>
    );
  }
}

export default Controls;
