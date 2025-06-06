import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import type { TemperatureUnit } from '../types/weather';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { state, dispatch, fetchWeather } = useWeather();

  const handleUnitChange = (unit: TemperatureUnit) => {
    dispatch({ type: 'TOGGLE_UNIT', payload: unit });
  };

  const handleRefresh = () => {
    fetchWeather(state.currentCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Temperature Unit</h4>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={state.unit === 'celsius'}
                  onChange={() => handleUnitChange('celsius')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Celsius (°C)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={state.unit === 'fahrenheit'}
                  onChange={() => handleUnitChange('fahrenheit')}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Fahrenheit (°F)</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Options</h4>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Show humidity</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Show wind speed</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  defaultChecked
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Show feels like temperature</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Refresh Rate</h4>
            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
              <option value="180">Every 3 hours</option>
              <option value="360">Every 6 hours</option>
            </select>
          </div>
          
          <div className="pt-2 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;