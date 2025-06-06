import WeatherWidget from "./components/WeatherWidget";
import { ThemeProvider } from "./context/ThemeContext";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <WeatherWidget />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;