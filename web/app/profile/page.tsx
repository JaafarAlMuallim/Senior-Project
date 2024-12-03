import { CourseGrid } from "@/components/CourseGrid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProfileSection } from "@/components/ProfileSection";

const ProfilePage = async () => {
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
