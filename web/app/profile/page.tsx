import CourseGridSchedule from "@/components/CourseGridSchedule";
import CourseGridTutoring from "@/components/CourseGridTutoring";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { ProfileSection } from "@/components/ProfileSection";

const ProfilePage = async () => {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper className="my-8 px-4 mx-4">
      <div className="flex flex-col md:flex-row gap-8 md:gap-32">
          <ProfileSection />
        <div className="flex flex-col gap-8 w-full md:w-auto">
            <CourseGridSchedule />
            <CourseGridTutoring />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default ProfilePage;
