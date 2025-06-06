import React from 'react';
import { Wind, Droplets, ArrowUp, ArrowDown } from 'lucide-react';
import type { City, CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../utils/temperature';
import WeatherIcon from './WeatherIcon';

interface WeatherDisplayProps {
  weather: CurrentWeather;
  city: City;
  unit: TemperatureUnit;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, city, unit }) => {
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formattedDate = formatDate(weather.timestamp);

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{city}</h2>
        <p className="text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <WeatherIcon iconCode={weather.icon} size="large" />
          </div>
          <div>
            <div className="text-5xl font-bold text-gray-800 dark:text-white">
              {formatTemperature(weather.temp, unit)}
            </div>
            <div className="text-gray-500 dark:text-gray-400 capitalize">
              {weather.description}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <ArrowUp className="mr-2 text-red-500" size={18} />
            <span>High: {formatTemperature(weather.temp_max, unit)}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <ArrowDown className="mr-2 text-blue-500" size={18} />
            <span>Low: {formatTemperature(weather.temp_min, unit)}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Wind className="mr-2 text-teal-500" size={18} />
            <span>Wind: {weather.wind_speed} m/s</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Droplets className="mr-2 text-blue-500" size={18} />
            <span>Humidity: {weather.humidity}%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-gray-700 dark:text-gray-300">
        <p>
          Feels like {formatTemperature(weather.feels_like, unit)}. 
          {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}. 
          Air pressure: {weather.pressure} hPa.
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;