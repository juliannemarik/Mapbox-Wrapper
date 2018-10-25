import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Body.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return <div id="map" />;
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
