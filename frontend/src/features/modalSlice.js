import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
    modalForma: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.modal = action.payload
    },
    showModalForma: (state, action) => {
      state.modalForma = action.payload
    },
  },
})

export const { showModal, showModalForma } = modalSlice.actions
export default modalSlice.reducer
