type Material = {
  id: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  courseId: string | null;
  url: string;
  category: string;
  tagId: string | null;
};
export default Material;
