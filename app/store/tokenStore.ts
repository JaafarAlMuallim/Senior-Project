import { create } from "zustand";

type Token = {
  token: string;
};

type State = {
  token: Token;
};
type Action = {
  setToken: (token: Token) => void;
};

const useTokenStore = create<State & Action>((set) => ({
  token: {} as Token,
  setToken: (token: Token) => set({ token }),
}));

export { useTokenStore };
