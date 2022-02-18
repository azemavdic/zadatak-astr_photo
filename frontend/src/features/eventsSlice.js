import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    value: [
      // {
      //   id: '1',
      //   start: new Date(2022, 1, 2),
      //   end: new Date(2022, 1, 2),
      //   ime: 'Azem Avdic',
      //   godine: '25',
      //   email: 'asko@mail.com',
      //   thumbnail: 'https://i.pravatar.cc/300',
      // },
      // {
      //   id: '2',
      //   start: new Date(2022, 1, 16),
      //   end: new Date(2022, 1, 16),
      //   ime: 'jasmina',
      //   godine: '25',
      //   email: 'jasmina@mail.com',
      //   thumbnail: 'https://i.pravatar.cc/300',
      // },
      // {
      //   id: '3',
      //   start: new Date(2022, 1, 7),
      //   end: new Date(2022, 1, 7),
      //   ime: 'farah',
      //   godine: '25',
      //   email: 'farah@mail.com',
      //   thumbnail: 'https://i.pravatar.cc/300',
      // },
    ],
    isError: false,
    isLoading: false,
    isSuccess: false,
    poruka: '',
  },
  reducers: {
    dodajEvent: (state, action) => {
      state.value.push(action.payload)
    },
    izbrisiEvent: (state, action) => {
      state.value = state.value.filter((event) => event.id !== action.payload)
    },
  },
  // extraReducers: (builder) => {},
})

export const { dodajEvent, izbrisiEvent } = eventsSlice.actions
export default eventsSlice.reducer
