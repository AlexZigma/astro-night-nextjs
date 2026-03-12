import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Movie } from "../movies/types";
import { ModalMode, ModalState } from "./types";

const initialState: ModalState = {
  isOpen: false,
  mode: ModalMode.Add,
  currentMovie: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ mode: ModalMode; movie?: Movie } | undefined>,
    ) => {
      state.isOpen = true;
      state.mode = action.payload?.mode ?? ModalMode.Add;
      state.currentMovie = action.payload?.movie;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = ModalMode.Add;
      state.currentMovie = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
