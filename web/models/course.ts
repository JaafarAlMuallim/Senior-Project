type Course = {
  section: {
    course: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      groupId: string | null;
      code: string;
    };
  } & {
    id: string;
    title: string;
    courseId: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    recurrence: string | null;
    instructor: string | null;
    location: string | null;
    groupId: string | null;
  };
  id: string;
  userId: string;
  semester: string;
  createdAt: Date;
  updatedAt: Date;
  sectionId: string;
};
export default Course;
