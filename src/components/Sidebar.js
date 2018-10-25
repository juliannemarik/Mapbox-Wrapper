import './Body.css';
import React from 'react';
import { connect } from 'react-redux';
import { changeWaterColor, toggleStations, changeMarkerSize } from '../store/index';

const Sidebar = props => {
  const { changeWaterColor, toggleStations, changeMarkerSize } = props;

  const handleColorChange = event => {
    const color = event.target.value;
    changeWaterColor(color);
  };

  const handleStations = event => {
    const visibility = event.target.value === 'on' ? 'visible' : 'none';
    toggleStations(visibility);
  };

  const handleSizeChange = event => {
    console.log('SIZE CHANGE', event.target.value)
    const size = event.target.value;
    changeMarkerSize(Number(size));
  }

  return (
    <div id="sidebar">
      <h1>MAP STYLING</h1>
      <form>
        <div
          className="styleOption mapStyle"
          onChange={event => handleColorChange(event)}
        >
          <h3>WATER COLOR</h3>
          <label className="sidebarField lightBlue">
            <input
              id="colorRadio"
              type="radio"
              value="hsl(185, 9%, 81%)"
              name="waterColor"
            />
          </label>
          <label className="sidebarField darkBlue">
            <input
              id="colorRadio"
              type="radio"
              value="hsl(226, 51%, 60%)"
              name="waterColor"
            />
          </label>
          <label className="sidebarField darkTurquoise">
            <input
              id="colorRadio"
              type="radio"
              value="hsl(197, 94.6%, 29.2%)"
              name="waterColor"
            />
          </label>
        </div>

        <div
          className="styleOption evStations"
          onChange={event => handleStations(event)}
        >
          <h3> EV STATIONS </h3>
          <label className="sidebarField">
            <input type="radio" value="on" name="chargingStation" />
            On
          </label>
          <label className="sidebarField">
            <input type="radio" value="off" name="chargingStation" />
            Off
          </label>
        </div>

        <div
        className="styleOption icon"
        onChange={event => handleSizeChange(event)}
        >
          <h3>MARKER SIZE</h3>
          <input
            type="number"
            step = "0.5"
            min="1"
            max="10"
            className="zoomInput"
            placeholder="3"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    map: state.map,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWaterColor: color => {
      dispatch(changeWaterColor(color));
    },
    toggleStations: visibility => {
      dispatch(toggleStations(visibility));
    },
    changeMarkerSize: size => {
      dispatch(changeMarkerSize(size));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
