import './Body.css';
import React from 'react';
import { connect } from 'react-redux';
import { changeWaterColor, toggleStations } from '../store/index';
// const maki = require('maki');



const Sidebar = props => {
  const { changeWaterColor, toggleStations } = props;

  const handleStyleChange = (event) => {
    console.log('COLOR', event.target.value);
    const color = event.target.value;
    changeWaterColor(color)
  }

  const handleStations = (event) => {
    const visibility = event.target.value === 'on' ? 'visible' : 'none';
    toggleStations(visibility);
  }

  return (
    <div id="sidebar">
      <h1>MAP STYLING</h1>
      <form>
        <div
        className="styleOption mapStyle"
        onChange={(event) => handleStyleChange(event)}
        >
          <h3>WATER COLOR</h3>
          <label className="sidebarField lightBlue">
            <input
              id = "colorRadio"
              type="radio"
              value="hsl(185, 9%, 81%)"
              name="waterColor"/>
          </label>
          <label className="sidebarField darkBlue">
            <input
              id = "colorRadio"
              type="radio"
              value="hsl(226, 51%, 60%)"
              name="waterColor"/>
          </label>
          <label className="sidebarField darkTurquoise">
            <input
              id = "colorRadio"
              type="radio"
              value="hsl(197, 94.6%, 29.2%)"
              name="waterColor"/>
          </label>
        </div>

        <div
        className="styleOption evStations"
        onChange={(event) => handleStations(event)}>
          <h3> EV STATIONS </h3>
          <label className="sidebarField" >
            <input
              type="radio"
              value="on"
              name="chargingStation"/>
            On
          </label>
          <label className="sidebarField">
            <input
              type="radio"
              value="off"
              name="chargingStation"/>
            Off
          </label>
        </div>

        <div className="styleOption icon">
          <h3>MARKER SIZE</h3>
          <input
            type="number"
            min="1"
            max="20"
            className="zoomInput"
            placeholder="10"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    map: state.map
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeWaterColor: (color) => {
      dispatch(changeWaterColor(color))
    },
    toggleStations: (visibility) => {
      dispatch(toggleStations(visibility))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
