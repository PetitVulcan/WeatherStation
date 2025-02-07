// src/pages/LogsPage.tsx
import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card/Card';
import { weatherApi } from '../services/api';

const LogsPage = () => {
  const [activeTab, setActiveTab] = useState('functional');
  const [functionalLogs, setFunctionalLogs] = useState<string>('');
  const [sensorLogs, setSensorLogs] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const [functional, sensor] = await Promise.all([
          weatherApi.getFunctionalLogs(),
          weatherApi.getSensorLogs()
        ]);
        setFunctionalLogs(functional);
        setSensorLogs(sensor);
      } catch (err) {
        setError('Erreur lors de la récupération des logs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Chargement des logs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Logs de la Station Météo</h2>
      
      <div className="flex space-x-4 mb-4 border-b">
        <button
          onClick={() => setActiveTab('functional')}
          className={`pb-2 px-4 ${
            activeTab === 'functional' 
              ? 'border-b-2 border-orange-500 text-orange-600' 
              : 'text-gray-500'
          }`}
        >
          Logs Fonctionnels
        </button>
        <button
          onClick={() => setActiveTab('sensor')}
          className={`pb-2 px-4 ${
            activeTab === 'sensor' 
              ? 'border-b-2 border-orange-500 text-orange-600' 
              : 'text-gray-500'
          }`}
        >
          Logs Capteurs
        </button>
      </div>

      <div className="font-mono text-sm overflow-auto max-h-[70vh] bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap">
          {activeTab === 'functional' ? functionalLogs : sensorLogs}
        </pre>
      </div>
    </div>
  );
};

export default LogsPage;