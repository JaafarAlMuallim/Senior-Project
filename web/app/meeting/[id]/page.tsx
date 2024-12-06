"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { trpc } from "@/trpc/client";
import Loader from "@/components/Loader";

const courseId = "cm177rnwp0000119qsarlyxia";
const MeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { data: regs, isLoading } = trpc.schedule.getSchedule.useQuery({
    semester: "241",
  });

  const notAllowed = useMemo(
    () => !regs?.find((reg) => reg.section.course.id === courseId),
    [regs],
  );

  if (!isLoaded || isCallLoading || isLoading) return <Loader />;

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  if (notAllowed) {
    return <Alert title="You are not allowed to join this meeting" />;
  }

  return (
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
  );
};

export default MeetingPage;
