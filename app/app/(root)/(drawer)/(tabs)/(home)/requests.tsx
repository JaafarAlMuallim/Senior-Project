import CustomText from "@/components/CustomText";
import { trpc } from "@/lib/trpc";
import { separateNameNum } from "@/lib/utils";
import { useUserStore } from "@/store/store";
import { Suspense } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { formatDistance } from "date-fns";

const RequestsModalPage = () => {
  const { tutor } = useUserStore();
  const utils = trpc.useUtils();
  const { data: requests } = trpc.sessions.getPendingSessionTutor.useQuery(
    undefined,
    {
      enabled: !!tutor?.id,
    },
  );

  const { mutate: changeSessionStatus } =
    trpc.sessions.changeSessionStatus.useMutation();
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
    <Suspense fallback={<Text>Loading...</Text>}>
      <View className="h-full bg-white-default justify-start items-center py-8 gap-4">
        {Boolean(requests) && requests?.length! > 0 ? (
          requests?.map(
            (request) =>
              request.requester && (
                <View
                  className="w-96 flex flex-col p-4 border border-secondary-lightGray shadow bg-white-default rounded-lg"
                  key={request.id}
                >
                  <CustomText styles="text-xl">New Request</CustomText>
                  <CustomText styles="mt-2 text-md w-full">
                    {request.requester?.name.split(" ")[0]} requested a tutoring
                    session for{" "}
                    <CustomText styles="uppercase text-wrap">
                      {separateNameNum(request.course.code)}
                    </CustomText>
                    , {request.date.split("T")[0]} at{" "}
                    {request.date.split("T")[1].substring(0, 5)} .
                  </CustomText>
                  <View className="flex flex-row justify-between items-center w-full">
                    <CustomText styles="mt-2 text-secondary-gray">
                      {formatDistance(new Date(request.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </CustomText>
                    <View className="flex flex-row gap-2 my-2">
                      <TouchableOpacity
                        onPress={() => {
                          declineSession(request.id);
                        }}
                        className="flex flex-col justify-center items-center bg-danger-default p-2 rounded-lg"
                      >
                        <CustomText styles="text-toast-error">
                          Decline
                        </CustomText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          acceptSession(request.id);
                        }}
                        className="flex flex-col justify-center items-center bg-success-default p-2 rounded-lg"
                      >
                        <CustomText styles="text-toast-success">
                          Accept
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ),
          )
        ) : (
          <CustomText styles="text-2xl">No Tutoring Requests Yet.</CustomText>
        )}
      </View>
    </Suspense>
  );
};

export default RequestsModalPage;
