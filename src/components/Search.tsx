import { Fragment } from "react";
import styled from "styled-components"; 
import { Location } from "../model/location";

export type SearchPropsType = {
  query: string
  setQuery: (query: string) => void
  search: (query: string) => void
  selectLocation: (location: Location) => void
  locations: Location[] | undefined
  selectedLocation:  Location | undefined
  loading: boolean
}

type SearchGridPropsType = {
  locations: Location[] | undefined
  selectedLocation:  Location | undefined
  loading: boolean
}

const visible = (props : { locations: Location[] | undefined, selectedLocation:Location| undefined   } ) : string => {
  if (!!props.locations && (props.locations.length > 0)) {
    return ''
  }
  return 'visibility: hidden;'
}

const disableColor = (props : { loading: boolean  } ) : string => {
   return props.loading ? 'color: lightgray;' : ''
}

const SearchGrid = styled.div<SearchGridPropsType>`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    margin-top: 60px;
    justify-self: center;
    align-content: flex-start;
    align-items: center;
    grid-row-gap: 8px;
    label {
      margin-right: 6px;
      text-align: right;
      max-height: 24px;
      color: blue;
      ${disableColor}
    }
    label.select {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
      margin-right: 6px;
      text-align: right;
      ${visible}
    }
    input[type='text'] {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 3;
      width: 600px;
      margin-right: 40px;
    }
    button {
      grid-column-start: 3;
      grid-column-end: 4;
      justify-self: flex-start;
    }
    select {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: scan 2;
      justify-self: flex-start;
      align-self: center;
      ${visible}
    }
    p.hovertext {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 3;
      background-color: yellow;
      padding-bottom: 25px;
      
      height: 50px;
      align-self: center;
    }
    .hidden {
      visibility: hidden
    }
  `
const selectedEvent = (value : string, selectLocation: (location: Location) => void, locations: Location[]) => {
 // console.log({value})
  if (value !== '') {
    const selectedLocation = locations.find((location) => {
  //    console.log({placeId: location.place_id})
      return location.place_id === value
    })
    console.log({selectedLocation})
    if (!!selectedLocation) {
      selectLocation(selectedLocation)
    }
  }
}
const getLocations = (
  selectedLocation: Location | undefined, 
  locations: Location[] | undefined, 
  loading: boolean,
  selectLocation: (location: Location) => void) => {
        
      let locationsLoc = !!locations ? [...locations] : []
      if (locationsLoc.length < 2) {
        locationsLoc = []
      }
      return (
        <Fragment>
          <label className="select">Choose A Location matching your search:</label>
          <select disabled={loading} onChange={(event) => selectedEvent(event.target.value, selectLocation, locationsLoc)}>
            <option key={"blank_select"} value={''}>Please select a location ......</option>
            {
                locations?.map(l => {
                    const selected = selectedLocation && selectedLocation.place_id === l.place_id 
                    return (
                      <option key={l.place_id} value={l.place_id} selected={selected}>{l.display_name}</option>
                    )
                })
            }
          </select>
        </Fragment>
      )
  }

export const Search = (props: SearchPropsType) => {
    const { query, setQuery, search, locations, selectedLocation, loading, selectLocation} = props
    return (
    <SearchGrid locations={locations} selectedLocation={selectedLocation} loading={loading}>
      <label>Search For A Location :</label>
      <input 
        disabled={loading} 
        type="text"  
        value={query} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
      />
      <button disabled={loading} onClick={() => search(query)}>Search</button>
      {getLocations(selectedLocation, locations, loading, selectLocation )}
    </SearchGrid>
    )
}