import { ErrorClear, ERROR_CLEARED } from "./actiontypes"

export const clearError = (): ErrorClear  => {
  return {
    type: ERROR_CLEARED
  }
}
