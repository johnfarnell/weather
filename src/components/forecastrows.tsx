import { ReactElement } from "react";
import { Daily } from "../model/weather";
import { weatherConditions, WeatherLabel } from "./WeatherLabel";

export type ForecastsRowsPropsType = {
  daily: Daily[]
 }

const row = (currentrow: number, daily: Daily) : ReactElement[]  => {
  // The following generates one row, but allows for multiple secondary rows if there are multiple weather conditions
  const dt = new Date(daily.dt*1000)
  let col = 1
  let labels: ReactElement[]  = []
  labels.push(<WeatherLabel col={col++} row={currentrow}>{dt.toDateString()}</WeatherLabel>)
  labels.push(<WeatherLabel col={col++} row={currentrow}>{daily.temp.min}</WeatherLabel>)
  labels.push(<WeatherLabel col={col++} row={currentrow}>{daily.temp.max}</WeatherLabel>)
  labels = labels.concat(weatherConditions(currentrow, col, daily.weather))
  return labels
}

export const rows = (dailies: Daily[], rowStart: number) : ReactElement[]  => {
  let currentRow = rowStart
  let labels: ReactElement[]  = []
  //The following loops through the forecasts and generates an array of rows
  for (let daily of  dailies) {
    labels = labels.concat(row(currentRow, daily))
    currentRow = currentRow + daily.weather.length
   }

  return labels
}
