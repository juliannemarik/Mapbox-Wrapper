import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Body.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Immutable from 'immutable';
import { setStyle, fetchAllStations } from '../store/index';

class Map extends Component {
  componentDidMount() {
    const { accessToken, styleName, lon, lat, zoomScale } = this.props;
    const { setStyle, setInitialStations } = this.props;

    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // html element id in render
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat], // note lon comes before lat - geoJSON convention
      zoom: [zoomScale],
    });
    this.map.on('load', async () => {
      await setInitialStations().then(() => {
        const { chargingStations } = this.props;

        this.map.addSource('ev-charging-stations', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: chargingStations.map(station => {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [station.longitude, station.latitude],
                },
              };
            }),
          },
        });

        this.map.addLayer({
          id: 'allStations',
          type: 'circle',
          source: 'ev-charging-stations',
          layout: {
            visibility: 'none',
          },
          paint: {
            'circle-radius': 3,
            'circle-color': '#B42222',
          },
        });
        console.log('GET STYLE 1', this.map.getStyle());
        setStyle(this.map.getStyle());
      });
    });
  }

  componentDidUpdate(prevProps) {
    const currentStyle = this.props.style;
    const previousStyle = prevProps.style;

    if (this.props.style === null) return;

    if (!Immutable.is(previousStyle, currentStyle)) {
      console.log('component did update');
      this.map.setStyle(currentStyle);
    }
  }

  render() {
    return <div id="map" />;
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    chargingStations: state.chargingStations,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStyle: style => dispatch(setStyle(style)),
    setInitialStations: () => dispatch(fetchAllStations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
