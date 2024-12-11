"use client";
import { UserCircle } from "lucide-react";
import { add } from "date-fns";
import { separateNameNum } from "@/lib/utils";
import Session from "@/models/session";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { OwnCapability } from "@stream-io/node-sdk";

const TutorSession = ({ session }: { session: Session }) => {
  const time = session.date.toISOString().split("T")[1].substring(0, 5);
  const startTime = Number(time.split(":")[0]) + 3 + ":" + time.split(":")[1];
  console.log(startTime);
  const date = session.date.toISOString().split("T")[0];
  const endTime = add(session.date, { hours: 3, minutes: 30 })
    .toISOString()
    .split("T")[1]
    .substring(0, 5);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();
  const { toast } = useToast();

  const createMeeting = async () => {
    console.log("CLICKED");
    if (!client || !user) {
      toast({
        title: "Error",
        description: "An error occurred while creating the meeting",
        className: "bg-red-500 text-primary-white",
      });
      return;
    }
    console.log("CREATING MEETING");

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      call.permissionsContext.hasPermission(OwnCapability.SCREENSHARE);
      call.permissionsContext.hasPermission(OwnCapability.SEND_AUDIO);
      call.permissionsContext.hasPermission(OwnCapability.SEND_VIDEO);
      call.permissionsContext.hasPermission(OwnCapability.CREATE_REACTION);
      call.permissionsContext.hasPermission(OwnCapability.END_CALL);

      if (!call) throw new Error("Call not found");

      const startAt = new Date().toISOString();
      const description = `Tutoring session for ${session.course.code.toUpperCase()} at ${time} on ${date}`;
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      toast({
        title: "Meeting created",
        description: "Your tutoring session has been created",
        className: "bg-primary-light text-primary-white",
      });

      console.log("MEETING CREATED");
      router.push(`/meeting/${session.courseId}/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the meeting",
        className: "bg-red-500 text-white",
      });
      console.error(error);
    }
  };

  return (
    <div
      key={session.id}
      className="rounded-xl border bg-card text-card-foreground shadow p-4 hover:bg-primary-light hover:text-primary-white transition-all group cursor-pointer sm:w-full"
      onClick={createMeeting}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-primary-black group-hover:text-white uppercase">
              {separateNameNum(session.course.code)}
            </h4>
            <UserCircle className="text-primary h-6 w-6 group-hover:text-primary-white" />
          </div>
          <p className="text-gray-600 font-medium group-hover:text-white-alt">
            {startTime} - {endTime}
          </p>
          <p className="text-gray-500 text-sm group-hover:text-white-alt">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TutorSession;
