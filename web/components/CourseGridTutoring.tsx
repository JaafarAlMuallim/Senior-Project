import { trpc } from "@/trpc/server";
import CourseCard from "./CourseCard";

const CourseGridTutoring = async () => {
  const tutorCourses = await trpc.tutors.getTutorsCourseById();
  if (tutorCourses.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Tutor</h2>
      <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-8">
        {tutorCourses.map((item) => (
          <CourseCard
            key={item.course.id}
            id={item.course.id}
            code={item.course.code}
            name={item.course.name}
          />
        ))}
      </div>
    </div>
  );
};
export default CourseGridTutoring;
