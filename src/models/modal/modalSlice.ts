import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModalMode, ModalState, OpenModalPayload } from "./types";

const initialState: ModalState = {
  isOpen: false,
  mode: ModalMode.Add,
  currentMovie: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.mode = action.payload.mode;
      state.currentMovie = action.payload.movie ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = ModalMode.Add;
      state.currentMovie = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
