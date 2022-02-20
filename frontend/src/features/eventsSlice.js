import { createSlice } from '@reduxjs/toolkit'

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
      const event = state.value.find((ev) => ev.id === payload.id)
      if (event) {
        event.ime = payload.ime
        event.email = payload.email
        event.start = payload.start
        event.end = payload.end
        event.godine = payload.godine
        event.thumbnail = payload.thumbnail
        event.mobitel = payload.mobitel
        event.rodendan = payload.rodendan
      }
    },
  },
  // extraReducers: (builder) => {},
})

export const { dodajEvent, izbrisiEvent, isEditing, editujEvent } =
  eventsSlice.actions
export default eventsSlice.reducer
