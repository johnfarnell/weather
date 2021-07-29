import { ErrorActionTypes, ERROR_CLEARED } from "../actions/error/actiontypes"
import { LOCATION_LOADING_FAIL } from "../actions/location/actiontypes"
import { WEATHER_LOADING_FAIL } from "../actions/weather/actiontypes"

const errorReducer = (state: string = '', action: ErrorActionTypes) : string => {
 switch (action.type) {
    case LOCATION_LOADING_FAIL: {
      return action.payload
    }
    case WEATHER_LOADING_FAIL: 
      return action.payload
    case ERROR_CLEARED: 
      return ''
    default: {
      return state
    }
  }
}

export default errorReducer