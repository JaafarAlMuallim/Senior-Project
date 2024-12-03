import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CourseGridTutoring } from "./CourseGridTutoring";
import { CourseGridSchedule } from "./CourseGridSchedule";
import { ProfileSection } from "@/components/ProfileSection";

const ProfilePage = async () => {
  return (
    <MaxWidthWrapper className="my-8 px-4 mx-4">
      <div className="flex flex-row gap-32">
        <ProfileSection />
        <div className="flex flex-col gap-8">
          <CourseGridSchedule />
          <CourseGridTutoring />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
