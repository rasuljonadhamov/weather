import type { City, WeatherData } from "../types/weather";


// Weather icons
const weatherIcons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'];
const weatherDescriptions = [
  'clear sky',
  'few clouds',
  'scattered clouds',
  'broken clouds',
  'shower rain',
  'rain',
  'thunderstorm',
  'snow',
  'mist'
];

const MOCK_WEATHER_DATA: Record<City, Omit<WeatherData, 'lastUpdated'>> = {
  'London': {
    city: 'London',
    country: 'GB',
    current: {
      temp: 15,
      feels_like: 14,
      temp_min: 12,
      temp_max: 17,
      humidity: 75,
      pressure: 1012,
      wind_speed: 5.1,
      wind_deg: 230,
      description: 'cloudy with light rain',
      icon: '10d',
      timestamp: Math.floor(Date.now() / 1000),
    },
    forecast: generateMockForecast(12, 19, 'London'),
    dailyForecasts: [],
    timezone: 0,
  },
  'New York': {
    city: 'New York',
    country: 'US',
    current: {
      temp: 22,
      feels_like: 23,
      temp_min: 20,
      temp_max: 25,
      humidity: 65,
      pressure: 1018,
      wind_speed: 3.6,
      wind_deg: 180,
      description: 'partly cloudy',
      icon: '02d',
      timestamp: Math.floor(Date.now() / 1000),
    },
    forecast: generateMockForecast(18, 27, 'New York'),
    dailyForecasts: [],
    timezone: -14400,
  },
  'Tokyo': {
    city: 'Tokyo',
    country: 'JP',
    current: {
      temp: 28,
      feels_like: 30,
      temp_min: 26,
      temp_max: 31,
      humidity: 70,
      pressure: 1008,
      wind_speed: 2.1,
      wind_deg: 120,
      description: 'clear sky',
      icon: '01d',
      timestamp: Math.floor(Date.now() / 1000),
    },
    forecast: generateMockForecast(25, 32, 'Tokyo'),
    dailyForecasts: [],
    timezone: 32400,
  },
  'Sydney': {
    city: 'Sydney',
    country: 'AU',
    current: {
      temp: 24,
      feels_like: 25,
      temp_min: 22,
      temp_max: 27,
      humidity: 55,
      pressure: 1015,
      wind_speed: 6.2,
      wind_deg: 90,
      description: 'few clouds',
      icon: '02d',
      timestamp: Math.floor(Date.now() / 1000),
    },
    forecast: generateMockForecast(21, 28, 'Sydney'),
    dailyForecasts: [],
    timezone: 36000,
  },
  'Cairo': {
    city: 'Cairo',
    country: 'EG',
    current: {
      temp: 33,
      feels_like: 35,
      temp_min: 30,
      temp_max: 36,
      humidity: 25,
      pressure: 1010,
      wind_speed: 4.5,
      wind_deg: 45,
      description: 'clear sky',
      icon: '01d',
      timestamp: Math.floor(Date.now() / 1000),
    },
    forecast: generateMockForecast(28, 38, 'Cairo'),
    dailyForecasts: [],
    timezone: 7200,
  },
};

function generateMockForecast(minTemp: number, maxTemp: number, city: string) {
  const forecast = [];
  const now = new Date();
  
  for (let day = 0; day < 5; day++) {
    for (let hour = 0; hour < 24; hour += 3) {
      const forecastDate = new Date(now);
      forecastDate.setDate(now.getDate() + day);
      forecastDate.setHours(hour, 0, 0, 0);
      
      const tempVariation = Math.sin(hour / 24 * Math.PI) * ((maxTemp - minTemp) / 2);
      const temp = minTemp + (maxTemp - minTemp) / 2 + tempVariation;
      
      const iconIndex = Math.floor(Math.random() * weatherIcons.length);
      
      forecast.push({
        timestamp: Math.floor(forecastDate.getTime() / 1000),
        date: forecastDate.toISOString().split('T')[0],
        time: `${hour.toString().padStart(2, '0')}:00`,
        temp: temp,
        feels_like: temp - 1 + Math.random() * 2,
        temp_min: temp - 2 - Math.random(),
        temp_max: temp + 2 + Math.random(),
        humidity: Math.floor(40 + Math.random() * 40),
        pressure: Math.floor(1000 + Math.random() * 30),
        description: weatherDescriptions[iconIndex],
        icon: weatherIcons[iconIndex],
        wind_speed: 2 + Math.random() * 8,
        wind_deg: Math.floor(Math.random() * 360),
      });
    }
  }
  
  return forecast;
}

function calculateDailyForecasts(forecast: WeatherData['forecast']) {
  const dailyData: { [key: string]: WeatherData['forecast'] } = {};
  
  forecast.forEach(item => {
    if (!dailyData[item.date]) {
      dailyData[item.date] = [];
    }
    dailyData[item.date].push(item);
  });
  
  return Object.entries(dailyData).map(([date, items]) => {
    const temps = items.map(item => item.temp);
    const minTemp = Math.min(...items.map(item => item.temp_min));
    const maxTemp = Math.max(...items.map(item => item.temp_max));
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    const humidity = Math.round(items.reduce((sum, item) => sum + item.humidity, 0) / items.length);
    
    const conditionCounts: Record<string, number> = {};
    items.forEach(item => {
      conditionCounts[item.description] = (conditionCounts[item.description] || 0) + 1;
    });
    
    let mostFrequentCondition = items[0].description;
    let maxCount = 0;
    Object.entries(conditionCounts).forEach(([condition, count]) => {
      if (count > maxCount) {
        mostFrequentCondition = condition;
        maxCount = count;
      }
    });
    
    const iconForCondition = items.find(item => item.description === mostFrequentCondition)?.icon || items[0].icon;
    
    return {
      date,
      items,
      avgTemp,
      minTemp,
      maxTemp,
      humidity,
      description: mostFrequentCondition,
      icon: iconForCondition
    };
  });
}

export const fetchMockWeatherData = async (city: City): Promise<WeatherData> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  if (Math.random() < 0.05) {
    throw new Error('Failed to connect to weather service. Please try again.');
  }
  
  const baseData = structuredClone(MOCK_WEATHER_DATA[city]);
  
  baseData.current.temp += (Math.random() - 0.5) * 2;
  baseData.current.feels_like += (Math.random() - 0.5) * 2;
  baseData.current.humidity = Math.max(0, Math.min(100, baseData.current.humidity + (Math.random() - 0.5) * 10));
  baseData.current.wind_speed += (Math.random() - 0.5) * 2;
  baseData.current.timestamp = Math.floor(Date.now() / 1000);
  
  baseData.forecast.forEach(item => {
    item.temp += (Math.random() - 0.5) * 2;
    item.feels_like += (Math.random() - 0.5) * 2;
    item.temp_min += (Math.random() - 0.5);
    item.temp_max += (Math.random() - 0.5);
    item.humidity = Math.max(0, Math.min(100, item.humidity + (Math.random() - 0.5) * 10));
  });
  
  baseData.dailyForecasts = calculateDailyForecasts(baseData.forecast);
  
  return {
    ...baseData,
    lastUpdated: Date.now(),
  };
};