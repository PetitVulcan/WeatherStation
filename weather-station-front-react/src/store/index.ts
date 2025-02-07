// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    // Vous pourrez ajouter d'autres reducers ici plus tard
  },
  // Configuration middleware si nécessaire
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // Optionnel, désactive la vérification de sérialisation
    })
});

// Type pour le state racine et le dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks personnalisés
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;