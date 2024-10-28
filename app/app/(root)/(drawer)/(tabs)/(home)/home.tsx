import CustomText from "@/components/CustomText";
import { useUserStore } from "@/store/store";
import { trpc } from "@/lib/trpc";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect, router, Stack } from "expo-router";
import {
  ArrowDownNarrowWide,
  Bell,
  EllipsisVertical,
  FolderClosed,
  UserRound,
} from "lucide-react-native";
import { Suspense, useEffect } from "react";
import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import { separateNameNum } from "@/lib/utils";
import { useCoursesStore } from "@/store/coursesStore";
import { Text } from "@/components/ui/text";
import { toast } from "@/components/ui/toast";
import { add } from "date-fns";

const Page = () => {
  const { user } = useUser();
  const { user: userStore, tutor, setTutor } = useUserStore();
  const { setRegistrations } = useCoursesStore();
  console.log(tutor);

  const { data: userCourses } = trpc.schedule.getSchedule.useQuery(
    {
      userId: userStore?.user.id!,
      semester: "241",
    },
    {
      enabled: !!userStore?.user.id,
    },
  );

  const { data: isTutor } = trpc.tutors.isTutor.useQuery({
    userId: userStore?.user.id!,
  });

  if (isTutor && !tutor) {
    setTutor(isTutor);
  }

  const { data: sessions } = trpc.sessions.getAcceptedSessionTutor.useQuery(
    {
      tutorId: tutor?.id!,
    },
    {
      enabled: !!tutor?.id,
    },
  );
  const { data: requests } = trpc.sessions.getPendingSessionTutorCount.useQuery(
    {
      tutorId: tutor?.id!,
    },
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
  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "This is a success message.",
      ms: 3000, // 3 seconds
      variant: "success",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "Something went wrong.",
      variant: "error",
      ms: 3000, // 3 seconds
    });
  };

  if (!user) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedOut>
          <Redirect href={"/(auth)/welcome"} />
        </SignedOut>
      </View>
    );
  }

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
        <Suspense fallback={<Text>Loading...</Text>}>
          <View>
            <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
              Recent
            </CustomText>
            <CustomText styles={"text-md font-poppins text-gray-light"}>
              Recent Courses & Activities
            </CustomText>
            <View className="w-full flex flex-row my-2">
              <FlatList
                className="flex flex-row gap-2 py-2"
                horizontal
                showsHorizontalScrollIndicator={false}
                data={userCourses}
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
        <Suspense fallback={<Text>Loading...</Text>}>
          {tutor && (
            <View>
              <CustomText
                styles={"text-primary-light text-3xl font-poppinsBold"}
              >
                Sessions
              </CustomText>
              <CustomText styles={"text-md font-poppins text-gray-light"}>
                Upcoming Tutoring Sessions
              </CustomText>
              <View className="w-full flex flex-row my-2">
                {sessions && sessions.length > 0 ? (
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
                      console.log(item.date);
                      const endTime = add(new Date(item.date), { minutes: 30 })
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
                ) : (
                  <CustomText styles="text-2xl">
                    No Tutoring Sessions Yet.
                  </CustomText>
                )}
              </View>
            </View>
          )}
        </Suspense>

        <Suspense fallback={<Text>Loading...</Text>}>
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
                data={userCourses}
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
        </Suspense>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable onPress={showSuccessToast}>
            <Text>Show Success Toast</Text>
          </Pressable>
          <Pressable onPress={showErrorToast} style={{ marginTop: 20 }}>
            <Text>Show Error Toast</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Page;
