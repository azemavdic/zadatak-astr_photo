import { configureStore } from '@reduxjs/toolkit'
import { eventApi } from '../features/api'
import eventReducer from '../features/eventsSlice'
import modalReducer from '../features/modalSlice'

export const store = configureStore({
  reducer: {
    event: eventReducer,
    modal: modalReducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware),
})
