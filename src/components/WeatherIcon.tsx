import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Sun, 
  CloudSun, 
  CloudFog, 
  Wind 
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: 'small' | 'medium' | 'large';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 'medium' }) => {

  const sizeMap = {
    small: 24,
    medium: 36,
    large: 64
  };

  const iconSize = sizeMap[size];

  const getIconColor = (code: string): string => {
    if (code.includes('01')) return '#f59e0b'; 
    if (code.includes('02') || code.includes('03')) return '#60a5fa'; 
    if (code.includes('04')) return '#94a3b8'; 
    if (code.includes('09') || code.includes('10')) return '#3b82f6'; 
    if (code.includes('11')) return '#8b5cf6'; 
    if (code.includes('13')) return '#e2e8f0';  
    if (code.includes('50')) return '#94a3b8'; 
    return '#60a5fa'; 
  };

  const iconColor = getIconColor(iconCode);

  const renderIcon = () => {
    if (iconCode.includes('01d')) {
      return <Sun size={iconSize} color={iconColor} />;
    }
    if (iconCode.includes('01n')) {
      return <Sun size={iconSize} color="#f59e0b" opacity={0.8} />;
    }
    
    if (iconCode.includes('02')) {
      return <CloudSun size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('09')) {
      return <CloudRain size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('10')) {
      return <CloudRain size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('11')) {
      return <CloudLightning size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('13')) {
      return <CloudSnow size={iconSize} color={iconColor} />;
    }
    
    if (iconCode.includes('50')) {
      return <CloudFog size={iconSize} color={iconColor} />;
    }
    
    // Default
    return <Cloud size={iconSize} color={iconColor} />;
  };

  return (
    <div className="flex justify-center items-center">
      {renderIcon()}
    </div>
  );
};

export default WeatherIcon;