import React, { Component } from 'react';
import Slide from './slide/Slide';

class App extends Component {
  render() {
    const width = window.$(window).width();
    return (
      <div className='slider-wrapper'>
        <Slide width={width} height={width / 3.75}/>
      </div>
    );
  }
}

export default App;
