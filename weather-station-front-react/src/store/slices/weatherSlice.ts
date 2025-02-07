// src/store/slices/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherApi, WeatherData } from '../../services/api';

// Interface pour l'état du slice
interface WeatherState {
  data: WeatherData | null;
  functionalLogs: string | null;
  isInitialLoad: boolean ;
  sensorLogs: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// État initial
const initialState: WeatherState = {
  data: null,
  functionalLogs: null,
  isInitialLoad: true,
  sensorLogs: null,
  loading: 'idle',
  error: null
};

// Thunks pour les actions asynchrones
export const fetchAllData = createAsyncThunk(
  'weather/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await weatherApi.getAllData();
      return data;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des données');
    }
  }
);

export const fetchFunctionalLogs = createAsyncThunk(
  'weather/fetchFunctionalLogs',
  async (_, { rejectWithValue }) => {
    try {
      const logs = await weatherApi.getFunctionalLogs();
      return logs;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des logs fonctionnels');
    }
  }
);

export const fetchSensorLogs = createAsyncThunk(
  'weather/fetchSensorLogs',
  async (_, { rejectWithValue }) => {
    try {
      const logs = await weatherApi.getSensorLogs();
      return logs;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des logs de capteurs');
    }
  }
);

// Création du slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Réducteurs synchrones si nécessaire
    resetWeatherState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Gestion des états pour fetchAllData
    builder.addCase(fetchAllData.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAllData.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
      state.isInitialLoad = false;
    });
    builder.addCase(fetchAllData.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // Gestion des états pour fetchFunctionalLogs
    builder.addCase(fetchFunctionalLogs.fulfilled, (state, action) => {
      state.functionalLogs = action.payload;
    });

    // Gestion des états pour fetchSensorLogs
    builder.addCase(fetchSensorLogs.fulfilled, (state, action) => {
      state.sensorLogs = action.payload;
    });
  }
});

// Exportation des actions et du réducteur
export const { resetWeatherState } = weatherSlice.actions;
export default weatherSlice.reducer;