import type { TemperatureUnit } from "../types/weather";

export const convertTemperature = (temp: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else {
    return (temp - 32) * 5/9;
  }
};

export const formatTemperature = (temp: number, unit: TemperatureUnit, includeSymbol = true): string => {
  const roundedTemp = Math.round(temp);
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return includeSymbol ? `${roundedTemp}${symbol}` : `${roundedTemp}°`;
};

export const calculateAverageTemperature = (temperatures: number[]): number => {
  if (temperatures.length === 0) return 0;
  const sum = temperatures.reduce((acc, temp) => acc + temp, 0);
  return sum / temperatures.length;
};