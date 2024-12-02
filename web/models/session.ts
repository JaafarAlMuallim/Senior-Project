type Session = {
  id: string;
  courseId: string;
  title: string;
  startTime: Date;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  status: string;
  course: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    groupId: string | null;
    code: string;
  };
  requester: {
    id: string;
    email: string;
    name: string;
    clerkId: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    profileId: string | null;
    groupId: string | null;
  } | null;
};
export default Session;

export enum SessionStatus {
  ACCEPTED,
  DECLINED,
  PENDING,
  DONE,
  CANCELLED,
}
