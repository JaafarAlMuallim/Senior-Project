"use client";
import { separateNameNum } from "@/lib/utils";
import Session from "@/models/session";
import { add } from "date-fns";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useToast } from "@/hooks/use-toast";

const PendingSessions = ({ session }: { session: Session }) => {
  const utils = trpc.useUtils();
  const { toast } = useToast();
  const time = session.date.toISOString().split("T")[1].substring(0, 5);
  const date = session.date.toISOString().split("T")[0];
  const endTime = add(session.date, { hours: 1 })
    .toISOString()
    .split("T")[1]
    .substring(0, 5);

  const { mutate: changeSessionStatus } =
    trpc.sessions.changeSessionStatus.useMutation({
      onMutate: (data) => {
        return data;
      },
      onSuccess: () => {
        toast({
          title: "Session Status Changed",
          description: "The session status has been changed",
          className: "bg-success-600 text-primary-white",
        });
        utils.sessions.getPendingSessionTutor.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          className: "bg-danger-600 text-primary-white",
        });
      },
    });
  const acceptSession = (sessionId: string) => {
    changeSessionStatus({
      status: "ACCEPTED",
      sessionId: sessionId,
    }),
      {
        enabled: !!sessionId,
        onSuccess: () => {
          utils.sessions.getPendingSessionTutor.invalidate();
        },
      };
  };
  const declineSession = (sessionId: string) => {
    changeSessionStatus({
      status: "DECLINED",
      sessionId: sessionId,
    }),
      {
        enabled: !!sessionId,
      };
  };

  return (
    <div
      key={session.id}
      className="bg-primary-white rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-primary uppercase">
              {separateNameNum(session.course.code)}
            </h4>
          </div>
          <p className="text-gray-600 font-medium">
            {time} - {endTime} - {date}
          </p>
          <div className="flex flex-row gap-4 items-center justify-around my-2">
            <Button
              onClick={() => acceptSession(session.id)}
              className={buttonVariants({
                variant: "default",
                className:
                  "bg-success-600 text-primary-white hover:bg-success-700",
              })}
            >
              Accept
            </Button>
            <Button
              onClick={() => declineSession(session.id)}
              className={buttonVariants({
                variant: "default",
                className:
                  "bg-danger-600 text-primary-white hover:bg-danger-700",
              })}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingSessions;
