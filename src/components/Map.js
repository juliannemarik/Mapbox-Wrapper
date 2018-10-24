import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Body.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setMap, setStyle, fetchAllStations } from '../store/index';

class Map extends Component {

  componentDidMount() {
    const { accessToken, styleName, lon, lat, zoomScale } = this.props;
    const { setMap, setStyle, setInitialStations } = this.props;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: 'map', // html element id in render
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat], // note lon comes before lat - geoJSON convention
      zoom: [zoomScale],
    });
    map.on('load', async () => {
      setMap(map);
      setStyle(map.style);
      await setInitialStations().then(() => {
        const { chargingStations } = this.props;

        map.addSource('ev-charging-stations', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features:
              chargingStations.map(station => {
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

        map.addLayer({
          id: 'allStations',
          type: 'circle',
          source: 'ev-charging-stations',
          layout: {
            'visibility': 'visible'
          },
          paint: {
            'circle-radius': 3,
            'circle-color': '#B42222',
          },
        });
      });
    });
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
    setMap: map => dispatch(setMap(map)),
    setStyle: style => dispatch(setStyle(style)),
    setInitialStations: () => dispatch(fetchAllStations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
