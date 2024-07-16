import { create } from "zustand";

export const useStore = create<{
  editing: boolean;
  setEditing: (editing: boolean) => void;
}>((set) => ({
  editing: false,
  setEditing: (editing: boolean) => set({ editing }),
}));
