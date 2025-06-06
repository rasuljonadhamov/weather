import React, { useState, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { useDebounce } from '../hooks/useDebounce';
import type { City } from '../types/weather';

const cities: City[] = ['London', 'New York', 'Tokyo', 'Sydney', 'Cairo'];

const CitySelector: React.FC = () => {
  const { state, dispatch } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCityChange = (city: City) => {
    dispatch({ type: 'CHANGE_CITY', payload: city });
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCities = debouncedSearchTerm
    ? cities.filter(city => 
        city.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : cities;

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <MapPin size={18} className="text-gray-500 dark:text-gray-400" />
        <div 
          className="flex-1 flex items-center justify-between cursor-pointer py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {state.currentCity}
          </span>
          <span className="text-gray-400">▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 mx-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-all duration-200 animate-fadeIn">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors"
                autoFocus
              />
              <Search 
                size={16} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <div
                  key={city}
                  className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                    city === state.currentCity 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => handleCityChange(city)}
                >
                  {city}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 italic text-sm">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;