import { Movie } from "../movies/types";

export enum ModalMode {
  Add = "add",
  Edit = "edit",
}

export type ModalState = {
  isOpen: boolean;
  currentMovie?: Movie | null;
  mode: ModalMode;
};

export type OpenModalPayload = {
  mode: ModalMode;
  movie?: Movie;
};
