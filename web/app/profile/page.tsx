"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { z } from "zod";

import { CourseGrid } from "./CourseGrid";
import { ProfileSection } from "./ProfileSection";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COURSES = [
  {
    id: 1,
    code: "MATH 101",
    name: "Calculus 101",
    days: ["Monday", "Wednesday", "Friday"],
    time: "10:00 AM",
  },
  {
    id: 2,
    code: "MATH 102",
    name: "Calculus 102",
    days: ["Tuesday", "Thursday"],
    time: "11:00 AM",
  },
  {
    id: 3,
    code: "MATH 103",
    name: "Calculus 103",
    days: ["Monday", "Wednesday", "Friday"],
    time: "1:00 PM",
  },
  {
    id: 4,
    code: "MATH 104",
    name: "Calculus 104",
    days: ["Tuesday", "Thursday"],
    time: "2:00 PM",
  },
];

import { MoveRight } from "lucide-react";

const ProfilePage = () => {
  return (
    <MaxWidthWrapper className="my-8 px-4 mx-4">
      <div className="flex flex-row gap-32">
        <ProfileSection />
        <div className="flex flex-col gap-8">
          <CourseGrid title="Schedule" />
          <CourseGrid title="Tutoring" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
