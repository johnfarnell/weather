import { Location } from "../model/location" 
import { LOCATION_LOADING, LOCATION_LOADING_FAIL, LOCATION_LOADING_SUCCESS, LOCATION_SELECTED } from '../actions/location/actiontypes'
import { LocationActionTypes } from "../actions/location/actiontypes"

export interface LocationsState {
  loading: boolean,
  locations?: Location[]
  selectedLocation?: Location
}

const defaultState: LocationsState = {
  loading: false
}

// All of the state updates required as part of loading the one or more locations that match the user entered query

const locationsReducer = (state: LocationsState = defaultState, action: LocationActionTypes) : LocationsState => {
 switch (action.type) {
    case LOCATION_LOADING_FAIL: 
      return {
        ...state,
        loading: false
      }
    case LOCATION_LOADING: 
      return {
        ...state,
        locations: defaultState.locations,
        selectedLocation: defaultState.selectedLocation, 
        loading: true
      }
    case LOCATION_LOADING_SUCCESS: {
      // Note, that after a successful load of matching locations, if there is only ONE 
      // location found, automatically make it the selected one
      const selectedLocation = action.payload.length === 1 ? action.payload[0] : defaultState.selectedLocation
      return {
        ...state,
        loading: false,
        locations: action.payload,
        selectedLocation
      }
    }
    case LOCATION_SELECTED: 
      return {
        ...state,
        selectedLocation: action.payload
      }
    default: {
      return state
    }
  }
}

export default locationsReducer