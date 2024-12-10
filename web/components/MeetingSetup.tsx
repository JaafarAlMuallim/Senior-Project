"use client";
import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import Alert from "./Alert";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card, CardContent, CardTitle } from "./ui/card";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component.",
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(true);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return <Alert title="The call has been ended by the host" />;

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex-1 flex flex-col">
        <MaxWidthWrapper className="h-screen flex justify-center items-center">
          <Card className="bg-primary-white flex flex-col items-center justify-center gap-4 text-primary-black p-4">
            <CardTitle className="text-center text-2xl font-bold">
              Setup
            </CardTitle>
            <CardContent className="flex flex-col justify-center items-center">
              <div className="w-[600px] rounded-md flex justify-center items-center">
                <VideoPreview />
              </div>
              <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    checked={isMicCamToggled}
                    onChange={(e) => setIsMicCamToggled(e.target.checked)}
                  />
                  Join with mic and camera off
                </label>
                <div className="text-primary-white">
                  <DeviceSettings />
                </div>
              </div>
              <Button
                className="rounded-md bg-success-500 px-4 py-2.5 hover:bg-success-600 text-primary-white"
                variant={"default"}
                onClick={() => {
                  call.join();
                  setIsSetupComplete(true);
                }}
              >
                Join meeting
              </Button>
            </CardContent>
          </Card>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default MeetingSetup;
