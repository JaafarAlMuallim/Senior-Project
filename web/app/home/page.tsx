import { Suspense } from "react";
import BookTutorDialog from "@/components/BookTutorDialog";
import HelpSessionForm from "@/components/HelpSessionForm";
import { MOCK_COURSES, SESSIONS } from "@/validators/Placeholders";
import ScheduleItem from "@/components/ScheduleItem";
import CourseCard from "@/components/CourseCard";
import TutorSession from "@/components/TutorSessions";
import ApplyTutorForm from "@/components/ApplyTutorForm";

const HomePage = () => {
  const tutor = false;

  const today = new Date();
  const todayDay = today
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  const todaysCourses = MOCK_COURSES.filter((course) =>
    course.days.includes(todayDay),
  );

  const sortedCourses = [...todaysCourses].sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  return (
    <div className="mx-auto px-4 py-8 my-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 w-full">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-primary">My Courses</h3>
          <Suspense fallback={<div>Loading courses...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </Suspense>
          {tutor && (
            <>
              <h3 className="text-2xl font-semibold text-primary">
                Tutoring Sessions
              </h3>
              <Suspense fallback={<div>Loading sessions...</div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                  {SESSIONS?.map((session) => (
                    <TutorSession key={session.id} session={session} />
                  ))}
                  <HelpSessionForm />
                </div>
              </Suspense>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-primary">Schedule</h3>
          <div className="text-sm text-gray-500">
            Today -{" "}
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="space-y-6">
            {sortedCourses.map((course, index) => (
              <ScheduleItem
                key={course.id}
                course={course}
                isLast={index === sortedCourses.length - 1}
              />
            ))}
          </div>
          <BookTutorDialog />
          {!tutor && <ApplyTutorForm />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
