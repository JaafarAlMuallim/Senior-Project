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
      className="w-[250px] hover:bg-primary-light hover:text-white-defalut transition-all group cursor-pointer sm: w-full"
      onClick={() => {
        router.push(`/home/${id}`);
      }}
    >
      <CardHeader className="group">
        <CardTitle className="uppercase text-primary-black group-hover:text-white-default">{code}</CardTitle>
        <CardDescription className="group-hover:text-secondary-lightGray">
          {name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default CourseCard;
