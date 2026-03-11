import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Movie } from "../movies/types";
import { ModalState } from "./types";

const initialState: ModalState = {
  isOpen: false,
  currentMovie: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Movie | undefined>) => {
      state.isOpen = true;
      state.currentMovie = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.currentMovie = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
