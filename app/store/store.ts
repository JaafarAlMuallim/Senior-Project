import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name: string;
  clerkId: string;
  password: string | null;
  createdAt: string;
  updatedAt: string;
};
type Profile = {
  id: string;
  user: User;
  major: string | null;
  phone: string | null;
  university: string | null;
  standing: string | null;
  createdAt: string;
  updatedAt: string;
};

type Tutor = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type State = {
  user: Profile;
  tutor?: Tutor;
};
type Action = {
  setUser: (user: Profile) => void;
  setTutor: (tutor: Tutor) => void;
};

// userStore
const useUserStore = create<State & Action>((set) => ({
  user: {} as Profile,
  tutor: undefined,
  setUser: (user: Profile) => set({ user }),
  setTutor: (tutor: Tutor) => set({ tutor }),
}));

export { useUserStore };
