import { Location } from "../../model/location"
import { ErrorClear } from "../error/actiontypes"

export const LOCATION_LOADING_FAIL = "LOCATION_LOADING_FAIL"
export const LOCATION_LOADING = "LOCATION_LOADING"
export const LOCATION_LOADING_SUCCESS = "LOCATION_LOADING_SUCCESS"
export const LOCATION_SELECTED = "LOCATION_SELECTED"


type LocationLoadingSuccess = {
  type: typeof LOCATION_LOADING_SUCCESS,
  payload: Location[]
}
type LocationSelected = {
  type: typeof LOCATION_SELECTED,
  payload: Location
}
type LocationLoading = {
  type: typeof LOCATION_LOADING
}
export type LocationLoadingFail = {
  type: typeof LOCATION_LOADING_FAIL
  payload: string
}
export type LocationActionTypes = LocationLoadingSuccess | LocationLoading | LocationSelected | LocationLoadingFail | ErrorClear