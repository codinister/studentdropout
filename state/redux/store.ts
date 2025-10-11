'use client';

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import appReducer from './slice/appReducer';

const config = {
  key: 'root',
  storage,
};

const reducer = persistReducer(config, appReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch);
export default store;
