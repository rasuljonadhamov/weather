export type City = 'London' | 'New York' | 'Tokyo' | 'Sydney' | 'Cairo';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  description: string;
  icon: string;
  timestamp: number;
}

export interface ForecastItem {
  timestamp: number;
  date: string;
  time: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_deg: number;
}

export interface DailyForecast {
  date: string;
  items: ForecastItem[];
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  city: City;
  country: string;
  current: CurrentWeather;
  forecast: ForecastItem[];
  dailyForecasts: DailyForecast[];
  lastUpdated: number;
  timezone: number;
}

export interface WeatherStatistics {
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  temperatureVariance: number;
}