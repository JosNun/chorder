import React, { Component } from 'react';
import styled from 'styled-components';

import ChordCard from './ChordCard';
import Controls from './Controls';

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
      autoScroll: false,
    };

    let timer = null;

    this.prevChord = this.prevChord.bind(this);
    this.nextChord = this.nextChord.bind(this);
    this.moveChord = this.moveChord.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
  }

  moveChord(amount) {
    let newIndex = this.state.index + amount;
    let chords = this.state.chords;
    newIndex = Math.max(0, Math.min(newIndex, this.state.chords.length - 1));
    if (newIndex > 1 && newIndex > this.state.index) {
      chords.push(chords[newIndex - 2]);
    }
    this.setState({
      index: newIndex,
      chords: chords,
    });
  }

  prevChord() {
    this.moveChord(-1);
  }

  nextChord() {
    this.moveChord(1);
  }

  handleArrowKey(e) {
    if (e.key === 'ArrowLeft') this.prevChord();
    else if (e.key === 'ArrowRight') this.nextChord();
  }

  toggleAutoScroll() {
    this.setState({
      autoScroll: !this.state.autoScroll,
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

  componentDidMount() {
    window.addEventListener('keydown', this.handleArrowKey.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.handleArrowKey.bind(this),
      false
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.autoScroll && !prevState.autoScroll) {
      this.timer = setInterval(this.nextChord, 1000);
    } else if (this.timer && !this.state.autoScroll) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <Container>
        <ChordsList className="chordsList">
          {this.renderChordsList(this.state.chords)}
        </ChordsList>
        <Controls
          nextChord={this.nextChord}
          prevChord={this.prevChord}
          toggleAutoScroll={this.toggleAutoScroll}
        />
      </Container>
    );
  }
}
