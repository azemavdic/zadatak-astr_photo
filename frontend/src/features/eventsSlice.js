import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    value: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    poruka: '',
    editMode: false,
  },
  reducers: {
    dodajEvent: (state, action) => {
      state.value.push(action.payload)
    },
    izbrisiEvent: (state, action) => {
      state.value = state.value.filter((event) => event.id !== action.payload)
    },
    isEditing: (state, action) => {
      state.editMode = action.payload
    },
    editujEvent: (state, action) => {
      const { payload } = action
      state.value = state.value.map((event) => {
        return event.id === payload.id ? { ...event, event: payload } : event
      })
    },
  },
  // extraReducers: (builder) => {},
})

export const { dodajEvent, izbrisiEvent, isEditing, editujEvent } =
  eventsSlice.actions
export default eventsSlice.reducer
