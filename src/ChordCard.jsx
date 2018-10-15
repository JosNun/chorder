import React, { Component } from 'react';
import styled from 'styled-components';

const StyledChordCard = styled.div`
  position: absolute;
  top: calc(50% - 5rem);
  left: calc(50% - 5rem);
  width: 10rem;
  padding-top: 10rem;

  background-color: #fff;
  border-radius: 15px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3), -2px 2px 3px rgba(0, 0, 0, 0.3);

  transition-duration: 0.3s;

  opacity: ${props => (props.isBeforePrevious || props.isAfterNext ? 0 : 1)};

  transform: translate(
      ${props =>
        props.isBeforePrevious
          ? '-300%'
          : props.isPrevious
            ? '-150%'
            : props.isNext
              ? '150%'
              : props.isAfterNext
                ? '300%'
                : 0},
      -50%
    )
    scale(${props => (props.isActive ? 1.5 : 1)});
`;

const ChordCardContent = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(0, 0, 0, 0.87);
  font-family: 'Nunito', sans-serif;
  font-size: ${props => 8 / props.string.length}em;
  font-weight: 700;
`;

export default class ChordCard extends Component {
  render() {
    return (
      <StyledChordCard {...this.props}>
        <ChordCardContent string={this.props.children}>
          {this.props.children}
        </ChordCardContent>
      </StyledChordCard>
    );
  }
}
