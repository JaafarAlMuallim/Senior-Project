import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";

type TutorProfileCardProps = {
  name: string;
  email: string;
  phone: string;
  institution: string;
};

export const TutorProfileCard = ({
  name,
  email,
  phone,
  institution,
}: TutorProfileCardProps) => (
  <Card className="w-[380px] bg-primary-light text-primary-white">
    <CardHeader className="pb-2">
      <CardTitle>{name}</CardTitle>
      <CardDescription className="text-secondary-lightGray flex justify-between items-center">
        <span>{email}</span>
        <span>{phone}</span>
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <BriefcaseBusiness /> {institution}
      </div>
    </CardContent>
  </Card>
);

