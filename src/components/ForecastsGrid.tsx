import { ReactElement } from "react";
import styled from "styled-components"; 
import { Location } from "../model/location";
import { Daily, Weather, WeatherCondition } from "../model/weather";

export type ForecastsPropsType = {
  weather: Weather | undefined
  selectedLocation: Location | undefined
 }

type ForecastsGridPropsType = {
  weather: Weather | undefined 
}

const ForecastsGrid = styled.div<ForecastsGridPropsType>`
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-top: 24px;
    justify-content: flex-end;
    justify-items: center;
    align-content: flex-start;
    row-gap: 0px;

    label {
      text-align: center;
      color: blue;
    }
  `

const HeadingLabel = styled.label`
    font-weight: bold;
    font-size: larger;
    border: 0px solid #dfdfdf;
    padding-bottom: 24px;
`
type WeatherLabelType = {
  col: number
  row: number
  colEnd?: number
  padding?: boolean
}

const WeatherLabel = styled.label<WeatherLabelType>`
    margin-bottom: ${(props) => props.padding ? '15px' : '0px'};
    grid-column-start: ${(props) => props.col};
    grid-column-end: ${(props) => !!props.colEnd ? props.colEnd : props.col +1};
    grid-row-start: ${(props) => props.row};
    grid-row-end: ${(props) => props.row};

`

const weatherCondition = (row: number, col: number, text: string, lastCondition?: boolean) => {
  
  if (lastCondition) {
    return <WeatherLabel col={col} row={row} padding={lastCondition}>{text}</WeatherLabel>
  } else {
    return <WeatherLabel col={col} row={row} >{text}</WeatherLabel>
  }
  
}
const weatherConditions = (row: number, col: number, weatherConditions: WeatherCondition[]) : ReactElement[] => {
  let currentRow = row

  const labels: ReactElement[]  = []
  for (const wc of weatherConditions) {
    let currentCol= col
    labels.push(weatherCondition(currentRow, currentCol++, wc.main))
    const lastCondition:boolean = ((currentRow - (weatherConditions.length - 1)) === row)
    console.log({lastCondition})
    if (currentRow > row) {
      labels.push(<WeatherLabel col={1} colEnd ={currentCol} row={currentRow} padding={lastCondition}></WeatherLabel>)
      labels.push(weatherCondition(currentRow, currentCol++, wc.description, lastCondition))
    } else {
      labels.push(weatherCondition(currentRow, currentCol++, wc.description, lastCondition))
    }
    currentRow += 1
  }

  return labels
 
}
const row = (currentrow: number, daily: Daily) : ReactElement[]  => {
    const dt = new Date(daily.dt*1000)
    let col = 1
 //   console.log({dt: dt.toDateString()})
    let labels: ReactElement[]  = []
    console.log({currentrow})
    labels.push(<WeatherLabel col={col++} row={currentrow}>{dt.toDateString()}</WeatherLabel>)
    labels.push(<WeatherLabel col={col++} row={currentrow}>{daily.temp.min}</WeatherLabel>)
    labels.push(<WeatherLabel col={col++} row={currentrow}>{daily.temp.max}</WeatherLabel>)
    labels = labels.concat(weatherConditions(currentrow, col, daily.weather))
    return labels
}

const rows = (dailies: Daily[]) : ReactElement[]  => {
  let currentRow = 2
//  console.log({size: dailies.length})
  let labels: ReactElement[]  = []
  for (let daily of  dailies) {
  //({daily})
    console.log({weatherL: daily.weather.length})
    labels = labels.concat(row(currentRow, daily))
    currentRow = currentRow + daily.weather.length
    console.log({currentrowNow : currentRow})
  }

  return labels
}

export const Forecasts = (props: ForecastsPropsType) => {
    const {weather, selectedLocation} = props

    if (!weather || !selectedLocation) {
      return null
    }
    const rowEles : ReactElement[] = rows(weather.daily)
    return (
    <ForecastsGrid weather={weather}>
      <HeadingLabel>Date</HeadingLabel>
      <HeadingLabel>Min Temp°</HeadingLabel>
      <HeadingLabel>Max Temp°</HeadingLabel>
      <HeadingLabel>Weather Main</HeadingLabel>
      <HeadingLabel>Weather Description</HeadingLabel>
      {rowEles}
    </ForecastsGrid>
    )
}

