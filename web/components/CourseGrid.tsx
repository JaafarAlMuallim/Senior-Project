import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseOnly from "@/models/courseOnly";
import { MoveRight } from "lucide-react";

type CourseGridProps = {
  title: string;
  courses: CourseOnly[];
};

export const CourseGrid = ({ title, courses }: CourseGridProps) => {
  if (!courses.length) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: CourseOnly }) => {
  return (
    <Card className="w-[300px] hover:bg-primary-light hover:text-primary-white transition-all group">
      <CardHeader>
        <CardTitle className="uppercase">{course.code}</CardTitle>
        <CardDescription className="group-hover:text-secondary-lightGray capitalize">
          {course.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-row justify-start items-center flex-wrap gap-4">
          View Course <MoveRight size={24} />
        </ul>
      </CardContent>
    </Card>
  );
};
