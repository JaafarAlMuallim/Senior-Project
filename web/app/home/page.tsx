import BookTutorDialog from "@/components/BookTutorDialog";
import HelpSessionForm from "@/components/HelpSessionForm";
import ScheduleItem from "@/components/ScheduleItem";
import CourseCard from "@/components/CourseCard";
import TutorSession from "@/components/TutorSessions";
import ApplyTutorForm from "@/components/ApplyTutorForm";
import { trpc } from "@/trpc/server";
import PendingSessions from "@/components/PendingSessions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const HomePage = async () => {
  const schedule = await trpc.schedule.getSchedule({
    semester: "241",
  });
  const roles = await trpc.profiles.roles();
  const sessions = await trpc.sessions.getAcceptedSessionTutor();
  const requests = await trpc.sessions.getPendingSessionTutor();
  const tutor = !!roles.tutor;

  const today = new Date();
  const todayDay = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const todaysCourses = schedule.filter((course) =>
    course.section.recurrence?.includes(todayDay)
  );

  const sortedCourses = [...todaysCourses].sort(
    (a, b) => a.section.startTime.getTime() - b.section.startTime.getTime()
  );

  return (
    <MaxWidthWrapper>
      <div className="mx-auto px-4 py-8 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 w-full">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-primary">My Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.map((course) => (
                <CourseCard
                  key={course.id}
                  code={course.section.course.code}
                  name={course.section.course.name}
                  id={course.section.course.id}
                />
              ))}
            </div>
            {tutor && (
              <>
                <h3 className="text-2xl font-semibold text-primary">
                  Tutoring Sessions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                  {!!sessions.length ? (
                    sessions?.map((session) => (
                      <TutorSession key={session.id} session={session} />
                    ))
                  ) : (
                    <p>No Schedule Sessions</p>
                  )}
                </div>
              </>
            )}
            {tutor && (
              <>
                <h3 className="text-2xl font-semibold text-primary">
                  Pending Requests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                  {!!requests.length ? (
                    requests.map((session) => (
                      <PendingSessions key={session.id} session={session} />
                    ))
                  ) : (
                    <p>No Pending Requests</p>
                  )}
                </div>
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
            <div className="flex space-y-6 justify-center items-center">
              {!!sortedCourses.length ? (
                sortedCourses?.map((course, index) => (
                  <ScheduleItem
                    key={course.id}
                    course={course}
                    isLast={index === sortedCourses.length - 1}
                  />
                ))
              ) : (
                <p>No Classes Today</p>
              )}
            </div>
            <BookTutorDialog />
            <HelpSessionForm />
            {!tutor && <ApplyTutorForm />}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HomePage;
