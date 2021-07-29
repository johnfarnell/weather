import { LocationLoadingFail } from "../location/actiontypes"
import { WeatherLoadingFail } from "../weather/actiontypes"
export const ERROR_CLEARED = "ERROR_CLEARED"
export type ErrorClear = {
  type: typeof ERROR_CLEARED
}

export type ErrorActionTypes = WeatherLoadingFail | LocationLoadingFail | ErrorClear