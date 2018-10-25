import './Body.css';
import React from 'react';
import { connect } from 'react-redux';

const Sidebar = props => {
  return (
    <div id="sidebar">
      <h1>MAP STYLING</h1>
      <form>
        <div className="styleOption mapStyle">
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

        <div className="styleOption evStations">
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

        <div className="styleOption icon">
          <h3>MARKER SIZE</h3>
          <input
            type="number"
            step="0.5"
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

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
