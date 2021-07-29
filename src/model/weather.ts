export type WeatherCondition = {
  id: number,
  main: string,
  description:string,
}

export type Daily = {
  dt: number
  temp: {
    min: number,
    max: number,
  },
  weather: WeatherCondition[]
}

export type Weather = {
  lat: string,
  lon: string,
  daily: Daily[]
}
//
//  timezone: string,
//timezone_offset: number,

//              

