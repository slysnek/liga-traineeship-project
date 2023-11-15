import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import tasksSlice from 'src/store/tasksSlice';

export const store = configureStore({
  reducer: {
    tasksInStore: tasksSlice,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
