// src/components/common/Card/CardStat.tsx
import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Card, CardContent, CardHeader, CardTitle } from './index';
import { CardStatValue } from './CardStatValue';
import { weatherApi } from '../../../services/api';

type WeatherApiMethods = keyof typeof weatherApi;

interface CardStatProps {
  title: string;
  value: string | number;
  unit: string;
  icon: IconDefinition;
  iconColor: string;
  bgColor: string;
  dataKey: WeatherApiMethods;
}

export const CardStat: React.FC<CardStatProps> = ({
  title,
  value,
  unit,
  icon,
  iconColor,
  bgColor,
  dataKey
}) => (
  <Card className={`${bgColor} hover:shadow-lg transition-all duration-300`}>
    <CardHeader>
      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardStatValue
        initialValue={value}
        icon={icon}
        iconColor={iconColor}
        unit={unit}
        dataKey={dataKey}
      />
    </CardContent>
  </Card>
);