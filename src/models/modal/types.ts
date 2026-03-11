import { Movie } from "../movies/types";

export type ModalState = {
  isOpen: boolean;
  currentMovie?: Movie | null;
};

export enum ModalVariant {
  Add = "add",
  Edit = "edit",
}
