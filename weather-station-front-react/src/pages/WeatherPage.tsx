// src/pages/WeatherPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchAllData } from '../store/slices/weatherSlice';
import { Skeleton } from '../components/common/Skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/common/Alert/Alert';
import { CardStat } from '../components/common/Card/CardStat';
import {
  faTemperatureHalf,
  faDroplet,
  faTachometerAlt,
  faMaskVentilator,
  faCloudRain,
  faMicrochip,
  faCalendarDay,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const REFRESH_INTERVAL = 30000; // 30 secondes en millisecondes

const WeatherPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);
  const getAirQualityColors = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return {
          iconColor: 'bg-emerald-500',
          bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
        };
      case 'Bon':
        return {
          iconColor: 'bg-lime-500',
          bgColor: 'bg-lime-50 dark:bg-lime-900/10'
        };
      case 'Moyen':
        return {
          iconColor: 'bg-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/10'
        };
      case 'Médiocre':
        return {
          iconColor: 'bg-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/10'
        };
      case 'Mauvais':
        return {
          iconColor: 'bg-gray-900',
          bgColor: 'bg-gray-100 dark:bg-gray-900/10'
        };
      default:
        return {
          iconColor: 'bg-gray-500',
          bgColor: 'bg-gray-50 dark:bg-gray-900/10'
        };
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      dispatch(fetchAllData());
    };

    // Premier chargement
    fetchData();

    // Mise en place de l'intervalle seulement si les données sont déjà chargées
    if (data) {
      setIsInitialLoad(false);
      intervalId = setInterval(fetchData, REFRESH_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, data !== null]);

  if (isInitialLoad && loading === 'pending') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return <div>Aucune donnée disponible</div>;
  }

  const airQualityColors = getAirQualityColors(data.airQuality);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardStat
          title="Température"
          value={data.temperature}
          unit="°C"
          icon={faTemperatureHalf}
          iconColor="bg-red-500"
          bgColor="bg-red-50 dark:bg-red-900/10"
          dataKey="getTemperature"
        />
        <CardStat
          title="Humidité"
          value={data.humidity}
          unit="%"
          icon={faDroplet}
          iconColor="bg-blue-500"
          bgColor="bg-blue-50 dark:bg-blue-900/10"
          dataKey="getHumidity"
        />
        <CardStat
          title="Pression"
          value={data.pressure}
          unit="hPa"
          icon={faTachometerAlt}
          iconColor="bg-gray-500"
          bgColor="bg-gray-50 dark:bg-gray-900/10"
          dataKey="getPressure"
        />
        <CardStat
          title="Point de Rosée"
          value={data.dewpoint}
          unit="°C"
          icon={faCloudRain}
          iconColor="bg-blue-300"
          bgColor="bg-blue-50 dark:bg-blue-900/10"
          dataKey="getDewPoint"
        />
        <CardStat
          title="Qualité de l'Air"
          value={data.airQuality}
          unit=""
          icon={faMaskVentilator}
          iconColor={airQualityColors.iconColor}
          bgColor={airQualityColors.bgColor}
          dataKey="getAirQuality"
        />
        <CardStat
          title="Résistance Gaz"
          value={(data.gasResistance / 1000).toFixed(2)}
          unit="kΩ"
          icon={faMicrochip}
          iconColor="bg-purple-500"
          bgColor="bg-purple-50 dark:bg-purple-900/10"
          dataKey="getGasResistance"
        />
        <CardStat
          title="Date"
          value={data.date}
          unit=""
          icon={faCalendarDay}
          iconColor="bg-gray-500"
          bgColor="bg-gray-50 dark:bg-gray-900/10"
          dataKey="getAllData"
        />
        <CardStat
          title="Heure"
          value={data.time}
          unit=""
          icon={faClock}
          iconColor="bg-gray-500"
          bgColor="bg-gray-50 dark:bg-gray-900/10"
          dataKey="getAllData"
        />
      </div>
    </div>
  );
};

export default WeatherPage;