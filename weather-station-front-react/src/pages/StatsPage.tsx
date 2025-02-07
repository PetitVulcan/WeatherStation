import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { weatherApi } from '../services/api';
import Papa from 'papaparse';

interface DailyData {
  Date: string;
  Time: string;
  AirQuality: string;
  Temperature: number;
  Moisture: number;
  Pressure: number;
  DewPoint: number;
  Gas: number;
}

const StatsPage = () => {
  const [data, setData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await weatherApi.getSensorLogs();

        const parsedData = Papa.parse(response, {
          header: true,
          skipEmptyLines: true
        });

        const formattedData = parsedData.data
          .map((row: any) => ({
            Date: row.Date,
            Time: row.Time,
            AirQuality: row.AirQuality,
            Temperature: parseFloat(row.Temperature),
            Moisture: parseFloat(row.Moisture),
            Pressure: parseFloat(row.Pressure),
            DewPoint: parseFloat(row.DewPoint),
            Gas: parseFloat(row.Gas)
          }))
          .filter(row => !isNaN(row.Temperature) && !isNaN(row.Moisture) && !isNaN(row.Pressure)
            && !isNaN(row.DewPoint) && !isNaN(row.Gas));

        const last24Hours = formattedData.slice(-144);
        setData(last24Hours);

      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour obtenir le domaine Y selon le type de donnée
  const getYDomain = (dataKey: string, data: any[]) => {
    const values = data.map(item => item[dataKey]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    switch (dataKey) {
      case 'Temperature':
        // Température : arrondir à l'entier le plus proche avec un padding
        return [0, 30];
      case 'Moisture':
        // Humidité : de 0 à 100%
        return [0, 100];
      case 'Pressure':
        // Pression : ajuster autour des valeurs avec peu de padding
        return [900, 1100];
      case 'DewPoint':
        // Point de rosée : similaire à la température
        return [0, 30];
      case 'Gas':
        // Résistance au gaz : échelle logarithmique possible
        return [
          Math.floor(min - min * 0.1),
          Math.ceil(max + max * 0.1)
        ];
      case 'AirQuality':
        // Qualité de l'air : de 0 à 100
        return [0, 100];
      default:
        return ['auto', 'auto'];
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const renderChart = (dataKey: string, title: string, color: string, unit: string) => {
    const domain = getYDomain(dataKey, data);

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', minHeight: '400px', position: 'relative' }}>
            <LineChart
              width={1000}
              height={350}
              data={data}
              margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="Date"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={30}
              />
              <YAxis
                domain={domain}
                tickFormatter={(value) => value.toFixed(1)}
                label={{
                  value: unit,
                  angle: -90,
                  position: 'insideLeft',
                  offset: -20
                }}
              />
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(2)}${unit}`}
                labelFormatter={(label) => `${label}`}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-4">
      {renderChart('Temperature', 'Température', '#ef4444', ' °C')}
      {renderChart('DewPoint', 'Point de Rosée', '#d946ef', ' °C')}
      {renderChart('Pressure', 'Pression', '#6b7280', ' hPa')}
      {renderChart('Moisture', 'Humidité', '#3b82f6', ' %')}
      {renderChart('Gas', 'Résistance au Gaz', '#14b8a6', ' Ω')}
    </div>
  );
};

export default StatsPage;