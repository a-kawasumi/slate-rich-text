import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { pokemonApi } from '~/services/sample';
import type { PreloadedState } from '@reduxjs/toolkit';
import { localStorageMiddleware } from '~/app/middleware/localStorageMiddleware';
import counterReducer from './counter/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(pokemonApi.middleware).concat(localStorageMiddleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
