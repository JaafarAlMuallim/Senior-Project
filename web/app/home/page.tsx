import BookTutorDialog from "@/components/BookTutorDialog";
import HelpSessionForm from "@/components/HelpSessionForm";
import ScheduleItem from "@/components/ScheduleItem";
import CourseCard from "@/components/CourseCard";
import TutorSession from "@/components/TutorSessions";
import ApplyTutorForm from "@/components/ApplyTutorForm";
import { trpc } from "@/trpc/server";
import PendingSessions from "@/components/PendingSessions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { DAYS } from "@/validators/Placeholders";
import { redirect } from "next/navigation";
import ReportForm from "@/components/ReportPopover";

const HomePage = async () => {
  const schedule = await trpc.schedule.getSchedule({
    semester: "241",
  });
  const roles = await trpc.profiles.roles();
  const sessions = await trpc.sessions.getAcceptedSessionTutor();
  const helpSessions = await trpc.sessions.getUserSessions();
  const requests = await trpc.sessions.getPendingSessionTutor();
  const help = helpSessions.filter((session) => session.date > new Date());

  const today = new Date();
  const todayDay = today.toLocaleDateString("en-US", { weekday: "long" });

  const todayRec = DAYS.options.find((day) => day.label === todayDay);

  const todaysCourses = schedule.filter((course) =>
    course.section.recurrence?.includes(todayRec?.value!),
  );

  const sortedCourses = [...todaysCourses].sort(
    (a, b) => a.section.startTime.getTime() - b.section.startTime.getTime(),
  );

  if (schedule.length === 0) {
    redirect("/schedule");
  }

  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="mx-auto px-4 py-8 my-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 w-full">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-primary">
                My Courses
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-4">
                {schedule.map((course) => (
                  <CourseCard
                    key={course.id}
                    code={course.section.course.code}
                    name={course.section.course.name}
                    id={course.section.course.id}
                  />
                ))}
              </div>
              {roles.tutor && sessions.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold text-primary">
                    Tutoring Sessions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                    {sessions?.map((session) => (
                      <TutorSession key={session.id} session={session} />
                    ))}
                  </div>
                </>
              )}
              {helpSessions.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold text-primary">
                    Help Sessions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                    {help.length > 0 ? (
                      help?.map((session) => (
                        <TutorSession key={session.id} session={session} />
                      ))
                    ) : (
                      <p className="text-lg">No Scheduled Sessions</p>
                    )}
                  </div>
                </>
              )}

              {roles.tutor && requests.length > 0 && (
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
                      <p className="text-primary-black">No Pending Requests</p>
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
              <div className="flex flex-col space-y-6 justify-center items-center">
                {sortedCourses.length !== 0 ? (
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
              {!!!roles.tutor && <ApplyTutorForm />}
              {!!roles.tutor && <HelpSessionForm />}
              <ReportForm showText={true} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default HomePage;
