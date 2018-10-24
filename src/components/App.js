import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    const accessToken =
      'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ';
    const styleName = 'mapbox/light-v9';
    const lon = -87.6298;
    const lat = 41.8781;
    const zoomScale = 10;

    return (
      <div className="App">
        <Map
          accessToken={accessToken}
          styleName={styleName}
          lon={lon}
          lat={lat}
          zoomScale={zoomScale}
        />
        <Sidebar />
      </div>
    );
  }
}

export default App;
