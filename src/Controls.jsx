import React from 'react';
import styled from 'styled-components';

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

const ScrollButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  padding: 5px 10px;

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

const Controls = props => {
  return (
    <StyledControls>
      <ScrollButton onClick={props.prevChord} direction="left">
        <NavIcon /> Prev.
      </ScrollButton>
      <ScrollButton
        onClick={() => {
          props.toggleAutoScroll();
          !props.autoScrolling && props.nextChord();
        }}
        direction="up"
        className={props.autoScrolling ? 'active' : ''}
      >
        Auto Scroll
      </ScrollButton>
      <ScrollButton onClick={props.nextChord} direction="right">
        Next <NavIcon rotation="180" />
      </ScrollButton>
    </StyledControls>
  );
};

export default Controls;
