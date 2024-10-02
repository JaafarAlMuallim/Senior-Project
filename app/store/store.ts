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
type State = {
  user: Profile;
};
type Action = {
  setUser: (user: Profile) => void;
};

// userStore
const useUserStore = create<State & Action>((set) => ({
  user: {} as Profile,
  setUser: (user: Profile) => set({ user }),
}));

export { useUserStore };
