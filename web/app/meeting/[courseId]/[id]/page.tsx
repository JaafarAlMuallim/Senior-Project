"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { notFound, useParams } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { trpc } from "@/trpc/client";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MeetingPage = () => {
  const { id, courseId } = useParams<{ courseId: string; id: string }>();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { data: regs, isLoading } = trpc.schedule.getSchedule.useQuery({
    semester: "241",
  });
  const { data: courseTutor } = trpc.tutors.getTutorsCourseById.useQuery();

  const { user } = useUser();
  console.log(user?.id);
  const isTutor = useMemo(
    () => courseTutor?.find((tutor) => tutor.tutor.user.clerkId === user?.id),
    [courseTutor, user],
  );
  console.log(courseId);
  console.log(regs);
  console.log(courseTutor);
  console.log(isTutor);

  const allowed = useMemo(
    () => regs?.find((reg) => reg.section.course.id === courseId),
    [regs],
  );

  if (!isLoaded || isCallLoading || isLoading) return <Loader />;
  if (!id || !courseId) return notFound();

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  if (allowed || isTutor) {
    return (
      <>
        <main className="h-screen w-full">
          <StreamCall call={call}>
            <StreamTheme>
              {!isSetupComplete ? (
                <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
              ) : (
                <MeetingRoom />
              )}
            </StreamTheme>
          </StreamCall>
        </main>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-3.5rem-1px)] text-primary-white">
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-xl font-semibold">
              You are not allowed to access this call
            </p>
            <Button asChild className="bg-blue-1">
              <Link href="/home">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingPage;
