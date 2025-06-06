import React, { useMemo } from 'react';
import type { TemperatureUnit, WeatherData } from '../types/weather';
import { calculateStatistics } from '../utils/statistics';
import { formatTemperature } from '../utils/temperature';

interface DataVisualizationProps {
  weatherData: WeatherData;
  unit: TemperatureUnit;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ weatherData, unit }) => {
  const statistics = useMemo(() => calculateStatistics(weatherData), [weatherData]);

  const chartData = useMemo(() => {
    return weatherData.dailyForecasts.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      minTemp: day.minTemp,
      maxTemp: day.maxTemp,
      avgTemp: day.avgTemp
    }));
  }, [weatherData.dailyForecasts]);

  const allTemps = chartData.flatMap(day => [day.minTemp, day.maxTemp]);
  const minTemp = Math.floor(Math.min(...allTemps));
  const maxTemp = Math.ceil(Math.max(...allTemps));
  const tempRange = maxTemp - minTemp;
  
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 720 - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const scaleTemp = (temp: number) => {
    return chartHeight - ((temp - minTemp) / tempRange) * chartHeight + padding.top;
  };

  const barWidth = width / chartData.length;
  
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Temperature Analysis</h3>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Temperature</h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {formatTemperature(statistics.avgTemp, unit)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">Temperature Range</h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {formatTemperature(statistics.minTemp, unit)} - {formatTemperature(statistics.maxTemp, unit)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Humidity</h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {statistics.avgHumidity.toFixed(0)}%
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">5-Day Temperature Trend</h4>
        
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 ${width + padding.left + padding.right} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          <line 
            x1={padding.left} 
            y1={chartHeight + padding.top} 
            x2={width + padding.left} 
            y2={chartHeight + padding.top} 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
          
          <line 
            x1={padding.left} 
            y1={padding.top} 
            x2={padding.left} 
            y2={chartHeight + padding.top} 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
          
          <polyline 
            points={chartData.map((day, i) => {
              const x = padding.left + i * barWidth + barWidth / 2;
              const y = scaleTemp(day.avgTemp);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          
          {chartData.map((day, i) => {
            const x = padding.left + i * barWidth + barWidth / 2;
            const y = scaleTemp(day.avgTemp);
            return (
              <g key={i}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="#3B82F6" 
                />
                <text 
                  x={x} 
                  y={y - 10} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fill="#4B5563"
                  className="dark:fill-gray-300"
                >
                  {formatTemperature(day.avgTemp, unit, false)}
                </text>
                <line 
                  x1={x} 
                  y1={scaleTemp(day.minTemp)} 
                  x2={x} 
                  y2={scaleTemp(day.maxTemp)} 
                  stroke="#94A3B8" 
                  strokeWidth="1" 
                  strokeDasharray="2,2" 
                />
                
                <text 
                  x={x} 
                  y={chartHeight + padding.top + 20} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fill="#64748B"
                  className="dark:fill-gray-400"
                >
                  {day.date}
                </text>
              </g>
            );
          })}
          
          {/* Y-axis labels */}
          {[minTemp, (minTemp + maxTemp) / 2, maxTemp].map((temp, i) => {
            const y = scaleTemp(temp);
            return (
              <g key={i}>
                <text 
                  x={padding.left - 10} 
                  y={y + 4} 
                  textAnchor="end" 
                  fontSize="12" 
                  fill="#64748B"
                  className="dark:fill-gray-400"
                >
                  {formatTemperature(temp, unit, false)}
                </text>
                <line 
                  x1={padding.left - 5} 
                  y1={y} 
                  x2={padding.left} 
                  y2={y} 
                  stroke="#CBD5E1" 
                  strokeWidth="1" 
                />
                <line 
                  x1={padding.left} 
                  y1={y} 
                  x2={width + padding.left} 
                  y2={y} 
                  stroke="#CBD5E1" 
                  strokeWidth="1" 
                  strokeDasharray="2,2" 
                  opacity="0.5" 
                />
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-gray-800 dark:text-white mb-2">Temperature Insights</h4>
        <p className="text-gray-700 dark:text-gray-300">
          The temperature variance over this period is {statistics.temperatureVariance.toFixed(1)}°, with the 
          lowest temperature of {formatTemperature(statistics.minTemp, unit)} and highest of {formatTemperature(statistics.maxTemp, unit)}.
          The average daily humidity is {statistics.avgHumidity.toFixed(0)}%.
        </p>
      </div>
    </div>
  );
};

export default DataVisualization;