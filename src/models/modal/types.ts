import { Movie } from "../movies/types";

export type ModalState = {
  isOpen: boolean;
  currentMovie?: Movie;
  mode: ModalMode;
};

export enum ModalMode {
  Add = "add",
  Edit = "edit",
}
