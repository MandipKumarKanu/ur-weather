export type Coordinates = {
  lat: number;
  lon: number;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherData = {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
};

export type ForecastData = {
  list: Array<{
    dt: number;
    main: WeatherData["main"];
    weather: WeatherData["weather"];
    wind: WeatherData["wind"];
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: string;
    sunset: string;
  };
};

export type GeoCodingResponse = {
  name: string;
  local_name?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};
