type Schedule = {
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
    createdAt: Date;
    updatedAt: Date;
    groupId: string | null;
    title: string;
    courseId: string;
    startTime: Date;
    endTime: Date;
    recurrence: string | null;
    instructor: string | null;
    location: string | null;
  };
};
