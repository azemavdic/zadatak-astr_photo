import { configureStore } from '@reduxjs/toolkit'
import eventReducer from '../features/eventsSlice'
import modalReducer from '../features/modalSlice'

export const store = configureStore({
  reducer: {
    event: eventReducer,
    modal: modalReducer,
  },
})
