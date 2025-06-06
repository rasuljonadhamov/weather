import React, { useEffect, useState } from 'react';
import { Settings, Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import WeatherDisplay from './WeatherDisplay';
import ForecastList from './ForecastList';
import DataVisualization from './DataVisualization';
import ErrorBoundary from './ErrorBoundary';
import CitySelector from './CitySelector';
import SettingsPanel from './SettingsPanel';

type Tab = 'current' | 'forecast' | 'statistics';

const WeatherWidget: React.FC = () => {
  const { state, fetchWeather } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('current');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  console.log(`WeatherWidget rendered with theme: ${theme}`);
  
  useEffect(() => {
    fetchWeather(state.currentCity);
  }, []);

  useEffect(() => {
    if (state.isLoading) {
      fetchWeather(state.currentCity);
    }
  }, [state.currentCity, state.isLoading]);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const renderTabContent = () => {
    if (!state.weatherData) {
      return <div className="flex justify-center items-center h-64">Loading weather data...</div>;
    }

    switch (activeTab) {
      case 'current':
        return <WeatherDisplay weather={state.weatherData.current} city={state.currentCity} unit={state.unit} />;
      case 'forecast':
        return <ForecastList forecasts={state.weatherData.dailyForecasts} unit={state.unit} />;
      case 'statistics':
        return <DataVisualization weatherData={state.weatherData} unit={state.unit} />;
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className={`w-full max-w-[800px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${theme !== "light" ? "bg-[#f8f9fa]" : "bg-[#212529]"}`} >
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Weather Dashboard</h2>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <Sun size={20} />
            </button>
            <button 
              onClick={toggleSettings}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Open settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <CitySelector />

        {state.error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 text-sm">
            Error: {state.error}
          </div>
        )}

        <div className="px-4 pt-4 flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg flex items-center space-x-2 ${
              activeTab === 'current'
                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            } transition-all duration-200`}
            onClick={() => setActiveTab('current')}
          >
            <Sun size={16} />
            <span>Current</span>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg flex items-center space-x-2 ${
              activeTab === 'forecast'
                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            } transition-all duration-200`}
            onClick={() => setActiveTab('forecast')}
          >
            <Cloud size={16} />
            <span>Forecast</span>
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm rounded-t-lg flex items-center space-x-2 ${
              activeTab === 'statistics'
                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border-b-2 border-blue-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            } transition-all duration-200`}
            onClick={() => setActiveTab('statistics')}
          >
            <Thermometer size={16} />
            <span>Statistics</span>
          </button>
        </div>

        <div className="p-4">
          {renderTabContent()}
        </div>

        {isSettingsOpen && (
          <SettingsPanel onClose={toggleSettings} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default WeatherWidget;