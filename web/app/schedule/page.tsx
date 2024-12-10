import { Suspense } from "react";
import ScheduleClient from "./ScheduleClient";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ScheduleTable } from "./ScheduleTable";
import { trpc } from "@/trpc/server";
import ScheduleVisualization from "./scheduleVisualization";
import CourseOnly from "@/models/courseOnly";
import Loader from "@/components/Loader";
export default async function SchedulePage() {
  const scheduleData = await trpc.schedule.getSchedule({ semester: "241" });
  const sections = await trpc.courses.getAllSections();
  const uniqueCourseMap: Map<string, CourseOnly> = new Map();
  const uniqueInstructorMap: Map<string, string> = new Map();
  sections.forEach((section) => {
    if (!uniqueCourseMap.has(section.courseId)) {
      uniqueCourseMap.set(section.courseId, section.course);
    }
    if (section.instructor && !uniqueInstructorMap.has(section.instructor)) {
      uniqueInstructorMap.set(section.instructor, section.instructor);
    }
  });

  return (
    <>
      <Navbar />
      <MaxWidthWrapper className="my-8 px-12 flex flex-col gap-8">
        <Suspense fallback={<Loader />}>
          <ScheduleVisualization schedule={scheduleData} />
        </Suspense>
        <ScheduleClient
          courses={uniqueCourseMap}
          instructors={uniqueInstructorMap}
        />
        <Suspense fallback={<Loader />}>
          <ScheduleTable sections={sections} currSections={scheduleData} />
        </Suspense>
      </MaxWidthWrapper>
    </>
  );
}
