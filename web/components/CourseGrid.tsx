import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";

type CourseGridProps = {
  title: string;
};

export const CourseGrid = ({ title }: CourseGridProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <CourseCard key={i} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = () => {
  return (
    <Card className="w-[300px] hover:bg-primary-light hover:text-primary-white transition-all group">
      <CardHeader>
        <CardTitle>MATH 101</CardTitle>
        <CardDescription className="group-hover:text-secondary-lightGray">
          Calculs 101
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
