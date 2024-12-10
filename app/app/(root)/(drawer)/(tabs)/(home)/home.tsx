import CustomText from "@/components/CustomText";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { separateNameNum } from "@/lib/utils";
import { useOfflineStore } from "@/store/offlineStorage"; // Import the store
import { useUserStore } from "@/store/store";
import { add } from "date-fns";
import { Link, router, Stack } from "expo-router";
import {
  ArrowDownNarrowWide,
  Bell,
  EllipsisVertical,
  FolderClosed,
  UserRound,
} from "lucide-react-native";
import { Suspense, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { tutor, setTutor } = useUserStore();
  const { setRegistrations, registrations, user } = useOfflineStore();

  const { data: userCourses } = trpc.schedule.getSchedule.useQuery(
    {
      semester: "241",
    },
    {
      enabled: !!user?.user.id,
    },
  );

  const { data: isTutor } = trpc.tutors.isTutor.useQuery(undefined, {});

  if (isTutor && !tutor) {
    setTutor(isTutor);
  }

  const { data: sessions } = trpc.sessions.getAcceptedSessionTutor.useQuery(
    undefined,
    {
      suspense: true,
    },
  );
  const { data: requests } = trpc.sessions.getPendingSessionTutorCount.useQuery(
    undefined,
    {
      enabled: !!tutor?.id,
      refetchInterval: 10000,
    },
  );

  useEffect(() => {
    if (userCourses) {
      setRegistrations(userCourses);
    }
  }, [userCourses]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Courses",
          headerLeft: () => (
            <TouchableOpacity>
              <ArrowDownNarrowWide size={24} color="#4561FF" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/requests`);
              }}
            >
              <View className="relative p-2">
                <Bell size={24} color="#4561FF" />
                {Boolean(requests) && (
                  <View className="absolute right-[1px] top-[-2px] bg-red-600 rounded-full w-5 h-5 justify-center items-center">
                    <CustomText styles="text-white-default">
                      {requests}
                    </CustomText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
        }}
      />

      <View className="h-full flex flex-col p-8 pr-0 bg-white-default">
        <Suspense fallback={<CustomText>Loading...</CustomText>}>
          <View>
            <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
              Courses
            </CustomText>
            <CustomText styles={"text-md font-poppins text-gray-light"}>
              All Courses
            </CustomText>
            <View className="w-full flex flex-row my-2">
              <FlatList
                className="flex flex-row gap-2 py-2"
                horizontal
                showsHorizontalScrollIndicator={false}
                data={registrations}
                ItemSeparatorComponent={() => <View className="w-6" />}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      className="bg-primary-light w-56 h-32 p-4 rounded-xl flex justify-between shadow-sm shadow-gray-900"
                      onPress={() => {
                        router.push(`/courses/${item.section.course.id}`);
                      }}
                    >
                      <View className="flex-row justify-between">
                        <FolderClosed size={32} color={"white"} />
                        <EllipsisVertical size={32} color={"white"} />
                      </View>
                      <CustomText styles="text-white-default text-lg font-poppinsBold uppercase">
                        {separateNameNum(item.section.course.code)}
                      </CustomText>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Suspense>

        {/*<Suspense fallback={<CustomText>Loading...</CustomText>}>
          <View>
            <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
              Courses
            </CustomText>
            <CustomText styles={"text-md font-poppins text-gray-light"}>
              All Courses
            </CustomText>
            <View className="w-full flex flex-col my-2">
              <FlatList
                className="flex flex-col w-full gap-2 py-2 pr-12"
                data={registrations}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="h-4" />}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      className="bg-primary-light w-full h-32 p-4 rounded-xl flex justify-between shadow-sm shadow-gray-900"
                      onPress={() => {
                        router.push(`/courses/${item.section.course.id}`);
                      }}
                    >
                      <View className="flex flex-col">
                        <View className="flex-row w-full justify-between">
                          <View className="flex flex-row justify-center items-center">
                            <FolderClosed size={32} color={"white"} />
                            <CustomText styles="ml-4 text-white-default text-lg font-poppinsBold uppercase">
                              {separateNameNum(item.section.course.code)}
                            </CustomText>
                          </View>
                          <EllipsisVertical size={32} color={"white"} />
                        </View>
                        <CustomText styles="ml-12 text-white-default text-md capitalize">
                          {item.section.course.name}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Suspense>*/}

        <Suspense
          fallback={
            <Skeleton
              className={
                "w-56 h-32 rounded-xl flex justify-between shadow-sm shadow-gray-900"
              }
            />
          }
        >
          {tutor && (
            <View>
              <View className="flex flex-row justify-between items-center">
                <CustomText
                  styles={"text-primary-light text-3xl font-poppinsBold"}
                >
                  Sessions
                </CustomText>

                <TouchableOpacity
                  onPress={() => {
                    router.push(`/help-sessions`);
                  }}
                >
                  <View className="mr-4 items-center justify-center">
                    <CustomText styles="text-gray-dark underline">
                      Add Sessions
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </View>
              <CustomText styles={"text-md font-poppins text-gray-light"}>
                Upcoming Tutoring Sessions
              </CustomText>
              <View className="w-full flex flex-row my-2">
                {sessions && sessions.length > 0 ? (
                  <View className="flex flex-row items-center mr-8">
                    <FlatList
                      className="flex flex-row gap-2 py-2"
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={sessions}
                      ItemSeparatorComponent={() => <View className="w-6" />}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => {
                        const time = item.date.split("T")[1].substring(0, 5);
                        const date = item.date.split("T")[0];
                        const endTime = add(new Date(item.date), {
                          minutes: 30,
                        })
                          .toISOString()
                          .split("T")[1]
                          .substring(0, 5);
                        return (
                          <View className="bg-primary-light w-56 h-32 p-4 rounded-xl flex justify-between shadow-sm shadow-gray-900">
                            <View className="flex-row justify-between">
                              <UserRound size={32} color={"white"} />
                            </View>
                            <CustomText styles="text-white-default text-lg font-poppinsBold uppercase">
                              {separateNameNum(item.course.code)}
                            </CustomText>
                            <CustomText styles="text-white-default text-md">
                              {time} - {endTime} - {date}
                            </CustomText>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <CustomText styles="text-2xl">
                    No Tutoring Sessions Yet.{" "}
                    <Link href={"/help-session"}>
                      Schedule a help session now!
                    </Link>
                  </CustomText>
                )}
              </View>
            </View>
          )}
        </Suspense>
      </View>
    </>
  );
};

export default Page;
