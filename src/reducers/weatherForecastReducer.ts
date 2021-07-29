import { Weather } from "../model/weather" 
import { WEATHER_LOADING, WEATHER_LOADING_FAIL, WEATHER_LOADING_SUCCESS } from '../actions/weather/actiontypes'
import { WeatherLoadingActionTypes } from "../actions/weather/actiontypes"

export interface WeatherForecastState {
  loading: boolean,
  weather?: Weather
}

const defaultState: WeatherForecastState = {
  loading: false
}

const weatherForecastReducer = (state: WeatherForecastState = defaultState, action: WeatherLoadingActionTypes) : WeatherForecastState => {
 switch (action.type) {
    case WEATHER_LOADING_FAIL: 
      return {
        ...state,
        loading: false,
        weather: undefined
      }
    case WEATHER_LOADING: 
      return {
        ...state,
        loading: true,
        weather: undefined
      }
    case WEATHER_LOADING_SUCCESS: 
      return {
        ...state,
        loading: false,
        weather: action.payload
      }
    default: {
      return state
    }
  }
}

export default weatherForecastReducer