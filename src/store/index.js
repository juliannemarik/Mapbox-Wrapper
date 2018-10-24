import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import Immutable from 'immutable';
import axios from 'axios';

// ACTION TYPES
const SET_MAP = 'SET_MAP';
const SET_STYLE = 'SET_STYLE';
const CHANGE_MAP_STYLE = 'CHANGE_MAP_STYLE'
const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS'
const TOGGLE_STATIONS = 'TOGGLE_STATIONS'

// ACTION CREATORS
export const setMap = map => ({
  type: SET_MAP,
  map
})
export const setStyle = style => ({
  type: SET_STYLE,
  style,
});
export const changeMapStyle = style => ({
  type: CHANGE_MAP_STYLE,
  style
});
export const setChargingStations = (chargingStations) => ({
  type: SET_CHARGING_STATIONS,
  chargingStations
})
export const toggleStations = () => ({
  type: TOGGLE_STATIONS
})

// THUNK CREATOR
export const fetchAllStations = () => async dispatch => {
  const {data: chargingStations} = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=fdpgLKYjndcWXLur2BpDVOTmjYJWiW9LqhVTyRtX&state=IL&fuel_type=ELEC');
  dispatch(setChargingStations(chargingStations.fuel_stations));
};

// INITIAL STATE
const initialState = {
  style: {},
  map: {},
  chargingStations: []
};

// HANDLERS
const handlers = {
  [SET_MAP]: (state, action) => {
    return {...state, map: action.map}
  },
  [SET_STYLE]: (state, action) => {
    return { ...state, style: Immutable.fromJS(action.style) };
  },
  [CHANGE_MAP_STYLE]: (state, action) => {
    return {...state, style: Immutable.fromJS(action.style)}
  },
  [SET_CHARGING_STATIONS]: (state, action) => {
    return {...state, chargingStations: action.chargingStations}
  },
  [TOGGLE_STATIONS]: (state, action) => {
    const layer = state.style._layers.allStations
    const newStyle = state.style;
    newStyle._layers.allStations.visibility = 'none';
    layer.visibility = 'none';
    return {...state, style: Immutable.fromJS(newStyle)}
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  } else {
    return handlers[action.type](state, action);
  }
};

const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware);
export default store;
