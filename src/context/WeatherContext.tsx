import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useWeatherData } from '../hooks/useWeatherData';
import type { City, TemperatureUnit, WeatherData } from '../types/weather';

export type WeatherAction = 
  | { type: 'FETCH_WEATHER'; payload: WeatherData }
  | { type: 'CHANGE_CITY'; payload: City }
  | { type: 'TOGGLE_UNIT'; payload: TemperatureUnit }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

interface WeatherState {
  currentCity: City;
  weatherData: WeatherData | null;
  unit: TemperatureUnit;
  error: string | null;
  isLoading: boolean;
}

const initialState: WeatherState = {
  currentCity: 'London',
  weatherData: null,
  unit: 'celsius',
  error: null,
  isLoading: false
};

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return {
        ...state,
        weatherData: action.payload,
        error: null,
        isLoading: false
      };
    case 'CHANGE_CITY':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: true
      };
    case 'TOGGLE_UNIT':
      return {
        ...state,
        unit: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}

interface WeatherContextType {
  state: WeatherState;
  dispatch: React.Dispatch<WeatherAction>;
  fetchWeather: (city: City) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { fetchWeatherData } = useWeatherData();

  const fetchWeather = async (city: City) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await fetchWeatherData(city);
      console.log(data);
      
      dispatch({ type: 'FETCH_WEATHER', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch weather data' 
      });
    }
  };

  return (
    <WeatherContext.Provider value={{ state, dispatch, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};