import { ReactElement } from "react";
import styled from "styled-components"; 
import { Location } from "../model/location";
import { Weather } from "../model/weather";
import { rows } from "./forecastrows";

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

export const Forecasts = (props: ForecastsPropsType) => {
    const {weather, selectedLocation} = props

    if (!weather || !selectedLocation) {
      return null
    }
    // get the lines items for the grid
    const rowEles : ReactElement[] = rows(weather.daily, 2)
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

