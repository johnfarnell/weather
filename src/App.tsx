import { useState } from 'react';
import { MainGrid } from './components/MainGrid';
import { Search } from './components/Search';

import { getLongitudeAndLatitudes, selectLocation as selectLocationRedux } from './actions/location/actions'
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './store/store';
import { LocationsState } from './reducers/locationsReducer';
import { getDailyWeatherForecasts } from './actions/weather/actions';
import { WeatherForecastState } from './reducers/weatherForecastReducer';
import { useEffect } from 'react';
import { Location } from './model/location';
import { Forecasts } from './components/ForecastsGrid';
import { Error } from './components/Error';
import { Header } from './components/Header';

function App() {
// Weather key 6bf312cc8cb73d4d81ec1a6492faed13
// location key pk.5ac7bbc66377b31bfb3871ef7506b1e0

      const dispatch = useDispatch()
      const [query, setQuery] = useState('')
      const { locations, loading: loadingLocations, selectedLocation}: LocationsState  = useSelector((state: RootStore) => state.locations)
      const { weather, loading: loadingForecast}: WeatherForecastState  = useSelector((state: RootStore) => state.weatherForecast)
      const error : string  = useSelector((state: RootStore) => state.error)

      const { lat, lon} = selectedLocation || {}

      useEffect(() => {
        if ((!!lat) && (!!lon)) {
     //     console.log({lat, lon})
          dispatch(getDailyWeatherForecasts(lat, lon))
        }
      }, [lat, lon, dispatch])

      const loading = loadingLocations || loadingForecast
      console.log({ errorInApp3: error})
   //   console.log({forecastInApp3: weather})

      const search = (query: string) => {
        dispatch(getLongitudeAndLatitudes(query))
      }
      const selectLocation = (location: Location) => {
     //   console.log({location})
        dispatch(selectLocationRedux(location))
      }
      return (
          <MainGrid loading={loading}>
            <Header heading={"7 Day Weather Forecasts By Location (Lat/Lon)"}/> 
            <Search 
                  query={query} 
                  setQuery={setQuery} 
                  search={search} 
                  selectedLocation={selectedLocation} 
                  loading={loading}
                  locations={locations}
                  selectLocation={selectLocation}/>
            <Error message={error}/>
            <Forecasts weather={weather} selectedLocation={selectedLocation}></Forecasts>
          </MainGrid>
        );
}

export default App;
