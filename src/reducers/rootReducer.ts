import { combineReducers } from "redux"
import locationsReducer from "././locationsReducer"
import weatherForecastReducer from "./weatherForecastReducer"
import errorReducer from "./errorReducer"

const RootReducer = combineReducers( {
  locations: locationsReducer,
  weatherForecast: weatherForecastReducer,
  error: errorReducer
});

export default RootReducer;