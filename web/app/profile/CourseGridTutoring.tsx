import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";
import { MoveRight } from "lucide-react";

export const CourseGridTutoring = async () => {
  const tutor = await trpc.tutors.getTutorsCourseById();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Tutor</h2>
      <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
        {tutor.map((item) => (
          <CourseCard
            key={item.course.id}
            code={item.course.code}
            name={item.course.name}
          />
        ))}
      </div>
    </div>
  );
};

type CourseCardProps = {
  code: string;
  name: string;
};

const CourseCard = ({ code, name }: CourseCardProps) => {
  return (
    <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
      <CardHeader>
        <CardTitle>{code}</CardTitle>
        <CardDescription className="group-hover:text-secondary-lightGray">
          {name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
