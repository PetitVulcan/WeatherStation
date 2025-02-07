// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  dewpoint: number;
  airQuality: string;
  gasResistance: number;
  date: string;
  time: string;
}

export const weatherApi = {
  // Récupération de toutes les données
  async getAllData(): Promise<WeatherData> {
    try {
      const response = await axiosInstance.get<WeatherData>(`/getData`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      throw error;
    }
  },

  // Récupération des logs fonctionnels
  async getFunctionalLogs(): Promise<string> {
    try {
      const response = await axiosInstance.get<string>(`/logs/functional`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des logs fonctionnels', error);
      throw error;
    }
  },

  // Récupération des logs de données capteurs
  async getSensorLogs(): Promise<string> {
    try {
      const response = await axiosInstance.get<string>(`/logs/sensor`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des logs de capteurs', error);
      throw error;
    }
  },

  // Méthodes pour récupérer des données spécifiques
  async getTemperature(): Promise<number> {
    try {
      const response = await axiosInstance.get<number>(`/temperature`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la température', error);
      throw error;
    }
  },

  async getHumidity(): Promise<number> {
    try {
      const response = await axiosInstance.get<number>(`/humidity`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'humidité', error);
      throw error;
    }
  },

  async getPressure(): Promise<number> {
    try {
      const response = await axiosInstance.get<number>(`/pressure`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la pression', error);
      throw error;
    }
  },

  async getDewPoint(): Promise<number> {
    try {
      const response = await axiosInstance.get<number>(`/dewpoint`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du point de rosée', error);
      throw error;
    }
  },

  async getAirQuality(): Promise<string> {
    try {
      const response = await axiosInstance.get<string>(`/airQuality`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du point de rosée', error);
      throw error;
    }
  },

  async getGasResistance(): Promise<number> {
    try {
      const response = await axiosInstance.get<number>(`/gas`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du point de rosée', error);
      throw error;
    }
  }  
};