import { separateNameNum } from "@/lib/utils";
import Course from "@/models/course";

const ScheduleItem = ({
  course,
  isLast,
}: {
  course: Course;
  isLast: boolean;
}) => (
  <div key={course.id} className="flex items-start justify-start">
    <div className="flex flex-col gap-4 justify-between items-center">
      <div className="text-lg w-20">
        {course.section.startTime.toISOString().substring(0, 5)}
      </div>
      <div className="text-lg w-20">
        {course.section.endTime.toISOString().substring(0, 5)}
      </div>
    </div>
    <div className="flex-1 relative">
      <div
        className={`w-0.5 bg-blue-500 absolute ml-[-8px] ${isLast ? "h-full" : "h-full"}`}
      ></div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="font-medium uppercase">
          {separateNameNum(course.section.course.code)}
        </div>
        <div className="text-sm capitalize text-gray-500">
          {course.section.course.name}
        </div>
      </div>
    </div>
  </div>
);
export default ScheduleItem;
