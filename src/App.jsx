import React, { Component } from 'react';
import styled from 'styled-components';

import ChordCard from './ChordCard';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  background: radial-gradient(circle, #93a8ac, #424b54);
`;

const ChordsList = styled.main`
  height: 80%;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chords: ['A', 'C', 'E', 'Bm', 'G'],
      index: 1,
    };
  }

  moveChord(amount) {
    let newIndex = this.state.index + amount;
    newIndex = Math.max(0, Math.min(newIndex, this.state.chords.length - 1));
    this.setState({
      index: newIndex,
    });
  }

  renderChordsList(chords) {
    return chords.map((chord, i) => (
      <ChordCard
        key={chord + i}
        isBeforePrevious={this.state.index - i > 1}
        isPrevious={i === this.state.index - 1}
        isActive={i === this.state.index}
        isNext={i === this.state.index + 1}
        isAfterNext={i - this.state.index > 1}
      >
        {chord}
      </ChordCard>
    ));
  }

  render() {
    return (
      <Container>
        <ChordsList className="chordsList">
          {this.renderChordsList(this.state.chords)}
        </ChordsList>
        <button onClick={this.moveChord.bind(this, -1)}>Prev.</button>
        <button onClick={this.moveChord.bind(this, 1)}>Next</button>
      </Container>
    );
  }
}
