import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    //this bindings
    this.getPL = this.getPL.bind(this);

    //set up the states
    this.state = {
      PLRoot: {}
    };
  }

  componentDidMount(){
    this.getPL('PL', 'PLRoot');
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps');
    window.z = nextProps;
  };

  getPL(endpoint, stateToChange){

    let theEndpoint;
    switch (endpoint) {
          case 'PL':
              theEndpoint = "http://api.football-data.org/v1/competitions/445";
              break;
      }

    let httpRequest = new XMLHttpRequest();
    let self = this;

      httpRequest.onreadystatechange = function(){
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

              let placeholderObj = {};
              placeholderObj[stateToChange] = JSON.parse(httpRequest.responseText);
              self.setState(placeholderObj);
              window.z = placeholderObj;

            } else {
              console.log('There was a problem with the request.');
            }
          }
      };
      httpRequest.open('GET', theEndpoint, true);
      httpRequest.setRequestHeader('X-Auth-Token', '06fabd0fc83640c886c32345b88a6f54');
      httpRequest.send();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='http://upload.wikimedia.org/wikipedia/de/d/da/Manchester_United_FC.svg' className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.PLRoot.caption}</h1>
        </header>
        <p className="App-intro">
          Match day {this.state.PLRoot.currentMatchday} of {this.state.PLRoot.numberOfMatchdays}.
        </p>
      </div>
    );
  }
}

export default App;
