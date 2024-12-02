import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/trpc/server";
import { MoveRight } from "lucide-react";

export const CourseGridSchedule = async () => {
  const schedule = await trpc.schedule.getSchedule({ semester: "241" });
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Scheduale</h2>
      <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
        {schedule.map((item) => (
          <CourseCard
            key={item.section.course.id}
            code={item.section.course.code}
            name={item.section.course.name}
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
