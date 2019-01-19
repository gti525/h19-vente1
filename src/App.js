import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

class App extends Component {
  render() {
    return (
      <div>
        <HelloWorld id="helo"/>
        <HelloWorld/>
        allo
        <HelloWorld/>
        <HelloWorld/>
      </div>
    );
  }
}

export default App;
