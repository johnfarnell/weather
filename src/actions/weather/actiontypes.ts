import { Weather } from "../../model/weather"
import { ErrorClear } from "../error/actiontypes"

export const WEATHER_LOADING_FAIL = "WEATHER_LOADING_FAIL"
export const WEATHER_LOADING = "WEATHER_LOADING"
export const WEATHER_LOADING_SUCCESS = "WEATHER_LOADING_SUCCESS"

export type WeatherLoadingFail = {
  type: typeof WEATHER_LOADING_FAIL
  payload: string
}
type WeatherLoadingSuccess = {
  type: typeof WEATHER_LOADING_SUCCESS,
  payload: Weather
}
type WeatherLoadingLoading = {
  type: typeof WEATHER_LOADING
}
export type WeatherLoadingActionTypes = WeatherLoadingLoading | WeatherLoadingSuccess | WeatherLoadingFail | ErrorClear 