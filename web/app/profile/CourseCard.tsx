"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type CourseCardProps = {
  code: string;
  id: string;
  name: string;
};

const CourseCard = ({ code, name, id }: CourseCardProps) => {
  const router = useRouter();
  return (
    <Card
      className="w-[350px] hover:bg-primary-light hover:text-white-default transition-all group cursor-pointer"
      onClick={() => {
        router.push(`/courses/${id}`);
      }}
    >
      <CardHeader>
        <CardTitle className="uppercase">{code}</CardTitle>
        <CardDescription className="group-hover:text-secondary-lightGray">
          {name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default CourseCard;
