import axios from "axios"
import { Dispatch } from "redux"

import { LOCATION_LOADING, LOCATION_LOADING_SUCCESS, LOCATION_SELECTED, LocationActionTypes, LOCATION_LOADING_FAIL } from "./actiontypes"
import { Location } from "../../model/location" 
import { LOCATION_KEY } from "../../keys/keys"
import { clearError } from "../error/actions"

export const selectLocation = (location: Location) => {
  return {
    type: LOCATION_SELECTED,
    payload: location
  }
}
export const getLongitudeAndLatitudes = (query: string) => async (dispatch: Dispatch<LocationActionTypes>) => {
  try {
    dispatch(clearError())

    dispatch({
      type: LOCATION_LOADING
    })

    //https://eu1.locationiq.com/v1/search.php?key={API_KEY}&q={LOCATION}&format=json 
    //https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&units=metric&  exclude=current,minutely,hourly&appid={API_KEY} 
 
    const params = new URLSearchParams([['key', LOCATION_KEY], ['q', query], ['format', 'json']]);
    //const res = await axios.get<Location[]>(`https://jsonplaceholder.typicode.com/posts?userId=${query}`)
    const res = await axios.get<Location[]>(`https://eu1.locationiq.com/v1/search.php`, { params })
  //  console.log({res})

    let payload: Location[] = res.data.map((l) => (
      { 
        place_id: l.place_id,
        lat: l.lat,
        lon: l.lon,
        display_name: l.display_name,
      }
    )
    )

    dispatch( {
      type:LOCATION_LOADING_SUCCESS,
      payload
    })

  } catch (e) {
    console.log({e})
    if (e.response.status === 404) {
      dispatch( {
        type: LOCATION_LOADING_FAIL,
        payload:'No Locations Found for the query data entered'
      })
    } else {
      dispatch( {
        type: LOCATION_LOADING_FAIL,
        payload:e.message
      })
    }
  }
}
