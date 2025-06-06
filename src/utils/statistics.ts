import type { WeatherData, WeatherStatistics } from "../types/weather";

export const calculateStatistics = (weatherData: WeatherData): WeatherStatistics => {
  const allTemperatures = weatherData.forecast.map(item => item.temp);
  const avgTemp = allTemperatures.reduce((sum, temp) => sum + temp, 0) / allTemperatures.length;
  
  const minTemp = Math.min(...allTemperatures);
  const maxTemp = Math.max(...allTemperatures);
  const temperatureVariance = maxTemp - minTemp;
  
  const avgHumidity = weatherData.forecast
    .map(item => item.humidity)
    .reduce((sum, humidity) => sum + humidity, 0) / weatherData.forecast.length;
  
  return {
    avgTemp,
    minTemp,
    maxTemp,
    avgHumidity,
    temperatureVariance
  };
};

export const calculateDailyAverages = (forecast: WeatherData['forecast']): { [date: string]: number } => {
  const dailyTemps: { [date: string]: number[] } = {};
  
  forecast.forEach(item => {
    const date = new Date(item.timestamp * 1000).toISOString().split('T')[0];
    if (!dailyTemps[date]) {
      dailyTemps[date] = [];
    }
    dailyTemps[date].push(item.temp);
  });
  
  const dailyAverages: { [date: string]: number } = {};
  for (const [date, temps] of Object.entries(dailyTemps)) {
    dailyAverages[date] = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  }
  
  return dailyAverages;
};