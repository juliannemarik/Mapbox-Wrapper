import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION TYPES
const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS';

// ACTION CREATORS
export const setChargingStations = chargingStations => ({
  type: SET_CHARGING_STATIONS,
  chargingStations,
});

// THUNK CREATOR
export const fetchAllStations = () => async dispatch => {
  const { data: chargingStations } = await axios.get(
    'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=fdpgLKYjndcWXLur2BpDVOTmjYJWiW9LqhVTyRtX&state=IL&fuel_type=ELEC'
  );
  dispatch(setChargingStations(chargingStations.fuel_stations));
};

// INITIAL STATE
const initialState = {
  style: {},
  chargingStations: [],
};

// HANDLERS
const handlers = {
  [SET_CHARGING_STATIONS]: (state, action) => {
    return { ...state, chargingStations: action.chargingStations };
  },
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
