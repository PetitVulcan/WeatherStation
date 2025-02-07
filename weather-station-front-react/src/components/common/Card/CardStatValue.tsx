// src/components/common/Card/CardStatValue.tsx
import React, { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherApi } from '../../../services/api';

type WeatherApiMethods = keyof typeof weatherApi;

interface CardStatValueProps {
  initialValue: string | number;
  icon: IconDefinition;
  iconColor: string;
  unit: string;
  dataKey: WeatherApiMethods;
}

export const CardStatValue: React.FC<CardStatValueProps> = ({
  initialValue,
  icon,
  iconColor,
  unit,
  dataKey
}) => {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    const updateValue = async () => {
      try {
        const newValue = await weatherApi[dataKey]();
        if (typeof newValue === 'number') {
          setValue(newValue);
        } else if (typeof newValue === 'string') {
          setValue(newValue);
        }
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de ${dataKey}:`, error);
      }
    };

    const intervalId = setInterval(updateValue, 30000);

    return () => clearInterval(intervalId);
  }, [dataKey]);

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
        <span className="ml-1 text-sm font-normal text-gray-600 dark:text-gray-300">
          {unit}
        </span>
      </h3>
      <div className={`p-3 rounded-lg ${iconColor}`}>
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};