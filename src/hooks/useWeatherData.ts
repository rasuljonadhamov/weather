import { useState, useCallback } from 'react';
import { fetchMockWeatherData } from '../services/mockWeatherService';
import { useThrottle } from './useThrottle';
import type { City, WeatherData } from '../types/weather';

export const useWeatherData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const throttledFetch = useThrottle(fetchMockWeatherData, 5000);

  const fetchWeatherData = useCallback(async (city: City): Promise<WeatherData> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await throttledFetch(city);
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [throttledFetch]);

  return {
    fetchWeatherData,
    isLoading,
    error
  };
};