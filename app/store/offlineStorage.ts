import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Course = {
  code: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};
type Section = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  startTime: string;
  endTime: string;
  recurrence: string | null;
  instructor: string | null;
  location: string | null;
  courseId: string;
  course: Course;
};
type Registration = {
  id: string;
  semester: string;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  userId: string;
  section: Section;
};

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

type Group = {
  id: string;
  name: string;
  groupId: string;
  type: string;
  ownerId: string | null;
};
type LastMessage = {
  groupId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  text: string;
};

interface UserStore {
  user: Profile; // Define your user type
  registrations: Registration[]; // Define your schedule type
  groups: Group[]; // Define your groups type
  lastMessage: Record<string, LastMessage>; // Last message for each group
  muteGroups: Set<string>; // Set of muted group IDs
  setUser: (user: Profile) => void;
  setRegistrations: (registrations: Registration[]) => void;
  setGroups: (groups: Group[]) => void;
  setLastMessage: (groupId: string, lastMsg: LastMessage) => void;
  muteGroup: (groupId: string) => void;
  unmuteGroup: (groupId: string) => void;
}

export const useOfflineStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as Profile,
      registrations: [],
      groups: [],
      lastMessage: {},
      muteGroups: new Set(),
      setUser: (user) => set({ user }),
      setRegistrations: (registrations) => set({ registrations }),
      setGroups: (groups) => set({ groups }),
      setLastMessage: (groupId, lastMsg) => {
        set((state) => {
          const newLastMessage = { ...state.lastMessage };
          newLastMessage[groupId] = lastMsg;
          return { lastMessage: newLastMessage };
        });
      },
      muteGroup: (groupId) =>
        set((state) => {
          const newMuteGroups = new Set(state.muteGroups);
          newMuteGroups.add(groupId);
          return { muteGroups: newMuteGroups };
        }),
      unmuteGroup: (groupId) =>
        set((state) => {
          const newMuteGroups = new Set(state.muteGroups);
          newMuteGroups.delete(groupId);
          return { muteGroups: newMuteGroups };
        }),
    }),
    {
      name: "user-storage", // Name of the storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for mobile
    },
  ),
);
