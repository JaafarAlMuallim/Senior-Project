type Section = {
  course: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    groupId: string | null;
    code: string;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  groupId: string | null;
  courseId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  recurrence: string | null;
  instructor: string | null;
  location: string | null;
};
export default Section;
