"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { z } from "zod";
import { CourseGrid } from "./course-grid";
import { ProfileSection } from "./profile-selection";

const formSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(10).optional(),
  password: z.string().min(8).optional(),
});

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
