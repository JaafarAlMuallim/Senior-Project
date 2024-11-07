import { create } from "zustand";

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
type State = {
  registrations: Registration[];
};
type Action = {
  setRegistrations: (registrations: Registration[]) => void;
};

const useCoursesStore = create<State & Action>((set) => ({
  registrations: [] as Registration[],
  setRegistrations: (registrations: Registration[]) => set({ registrations }),
}));

export { useCoursesStore };
