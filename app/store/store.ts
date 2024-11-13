import { create } from "zustand";

type Tutor = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type State = {
  tutor?: Tutor;
};
type Action = {
  setTutor: (tutor: Tutor) => void;
};

// userStore
const useUserStore = create<State & Action>((set) => ({
  tutor: undefined,
  setTutor: (tutor: Tutor) => set({ tutor }),
}));

export { useUserStore };
