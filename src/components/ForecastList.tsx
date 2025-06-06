import React from 'react';
import type { DailyForecast, TemperatureUnit } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../utils/temperature';

interface ForecastListProps {
  forecasts: DailyForecast[];
  unit: TemperatureUnit;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecasts, unit }) => {
  const formatDay = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <div 
            key={forecast.date} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-center">
              <h4 className="font-bold text-gray-800 dark:text-white">{formatDay(forecast.date)}</h4>
              <div className="my-2 flex justify-center">
                <WeatherIcon iconCode={forecast.icon} size="medium" />
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm capitalize mb-2">
                {forecast.description}
              </div>
              <div className="flex justify-between text-sm px-2">
                <span className="text-blue-500 font-medium">
                  {formatTemperature(forecast.minTemp, unit)}
                </span>
                <span className="text-red-500 font-medium">
                  {formatTemperature(forecast.maxTemp, unit)}
                </span>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                Avg: {formatTemperature(forecast.avgTemp, unit)}
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
                Humidity: {forecast.humidity}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;