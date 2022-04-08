/* eslint-disable consistent-return */
import { Middleware } from 'redux';

export const APPLICATION_STATE_KEY = 'applicationState';

export const localStorageMiddleware: Middleware =
  ({ getState }) =>
  next =>
  action => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const result = next(action);

    window.localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));

    return result;
  };

export const hydrateStore = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const persistedState = window.localStorage.getItem(APPLICATION_STATE_KEY);

  if (persistedState !== null) {
    return JSON.parse(persistedState);
  }
};
