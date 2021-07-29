import axios from "axios"
import { Dispatch } from "redux"

import { WEATHER_LOADING, WEATHER_LOADING_SUCCESS, WeatherLoadingActionTypes, WEATHER_LOADING_FAIL } from "./actiontypes"
import { Weather } from "../../model/weather" 
import { OPEN_WEATHER_KEY } from "../../keys/keys"
import { clearError } from "../error/actions"

export const getDailyWeatherForecasts = (lat: string, lon: string) => async (dispatch: Dispatch<WeatherLoadingActionTypes>) => {
  try {
   dispatch(clearError())

   dispatch({
      type: WEATHER_LOADING
    })
 
    const params = new URLSearchParams([
      ['appid', OPEN_WEATHER_KEY], 
      ['lat', lat], 
      ['lon', lon], 
      ['units', 'metric'], 
      ['exclude', 'current,minutely,hourly']
    ]);
    const res = await axios.get<Weather>(`https://api.openweathermap.org/data/2.5/onecall`, { params })

    //Just map the required data
    const payload = {
      lat: res.data.lat,
      lon: res.data.lon,
      daily: res.data.daily.map((d) => {
        
        const temp = {
          max: d.temp.max,
          min: d.temp.min
        }
        let weather = d.weather.map(w => {
          return {
            id: w.id,
            description: w.description,
            main: w.main
          }
        })
       return {
          dt: d.dt,
          temp, 
          weather
        }
      })
    }

    dispatch( {
      type:WEATHER_LOADING_SUCCESS,
      payload
    })

  } catch (e) {
    dispatch( {
      type: WEATHER_LOADING_FAIL,
      payload: e.message
    })
  }
}
