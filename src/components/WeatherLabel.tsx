import { ReactElement } from "react"
import styled from "styled-components"; 
import { WeatherCondition } from "../model/weather";

type WeatherLabelType = {
  col: number
  row: number
  colEnd?: number
  padding?: boolean
}

export const WeatherLabel = styled.label<WeatherLabelType>`
    margin-bottom: ${(props) => props.padding ? '15px' : '0px'};
    grid-column-start: ${(props) => props.col};
    grid-column-end: ${(props) => !!props.colEnd ? props.colEnd : props.col +1};
    grid-row-start: ${(props) => props.row};
    grid-row-end: ${(props) => props.row};

`

const weatherCondition = (row: number, col: number, text: string, lastCondition?: boolean) => {
  // Note, there is provision here to add some space to the bottom of this Label 
  if (lastCondition) {
    return <WeatherLabel col={col} row={row} padding={lastCondition}>{text}</WeatherLabel>
  } else {
    return <WeatherLabel col={col} row={row} >{text}</WeatherLabel>
  }
  
}

export const weatherConditions = (row: number, col: number, weatherConditions: WeatherCondition[]) : ReactElement[] => {

  // The following generates an array of WeatherLabel react elements for each WeatherCondition for the current row
  // Note that extra rows are added IF there are multiple weather conditions in the one day.

  let currentRow = row

  const labels: ReactElement[]  = []
  for (const wc of weatherConditions) {
    let currentCol= col
    labels.push(weatherCondition(currentRow, currentCol++, wc.main))

    // Fiddly logic ... The next line establishes if this is the last weather condition of this particular row - see below

    const lastCondition:boolean = ((currentRow - (weatherConditions.length - 1)) === row)
    if (currentRow > row) {

      // IF we are adding 1 or more rows because there are 2 or more conditions on this row, add a blank label for the other
      // columns in the table. Also note the padding if it is the last weather condition of this row

      labels.push(<WeatherLabel col={1} colEnd ={currentCol} row={currentRow} padding={lastCondition}></WeatherLabel>)
      labels.push(weatherCondition(currentRow, currentCol++, wc.description, lastCondition))
    } else {
      labels.push(weatherCondition(currentRow, currentCol++, wc.description, lastCondition))
    }
    currentRow += 1
  }

  return labels
 
}