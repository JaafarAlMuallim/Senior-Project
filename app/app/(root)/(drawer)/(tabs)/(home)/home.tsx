import CustomText from "@/components/CustomText";
import { useUserStore } from "@/store/store";
import { trpc } from "@/lib/trpc";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect, router, Stack } from "expo-router";
import {
  ArrowDownNarrowWide,
  Badge,
  Bell,
  EllipsisVertical,
  FolderClosed,
  Link,
  Loader2,
  UserRound,
} from "lucide-react-native";
import { useEffect } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { separateNameNum } from "@/lib/utils";
import { useCoursesStore } from "@/store/coursesStore";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { toast } from "@/components/ui/toast";

const Page = () => {
  const { user } = useUser();
  const { user: userStore, setUser } = useUserStore();
  const spinValue = new Animated.Value(0);
  const { setRegistrations } = useCoursesStore();

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { data, isLoading } = trpc.profiles.get.useQuery({
    clerkId: user?.id!,
  });

  const { data: userCourses, isLoading: coursesLoading } =
    trpc.schedule.getSchedule.useQuery(
      {
        userId: userStore?.user.id!,
        semester: "241",
      },
      {
        enabled: !!userStore?.user.id,
      },
    );

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
      if (data) {
        setUser(data);
      }
    }
  }, [isLoading]);

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

  if (isLoading || coursesLoading) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedIn>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
            className="flex-1 items-center justify-center"
          >
            <Loader2 className="h-48 w-48 animate-spin" size={96} />
          </Animated.View>
        </SignedIn>
        <SignedOut>
          <Redirect href={"/(auth)/welcome"} />
        </SignedOut>
      </View>
    );
  }

  if (!userCourses || userCourses.length === 0) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedIn>
          <View className="flex-1 items-center justify-center">
            <CustomText styles="text-2xl font-poppinsMedium text-primary-black text-center">
              Add your classes to view your schedule
            </CustomText>
          </View>
        </SignedIn>
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
                <View className="absolute right-[1px] top-[-2px] bg-red-600 rounded-full w-5 h-5 justify-center items-center">
                  <CustomText styles="text-white-default">2</CustomText>
                </View>
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
        <View>
          <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
            Sessions
          </CustomText>
          <CustomText styles={"text-md font-poppins text-gray-light"}>
            Upcoming Tutoring Sessions
          </CustomText>
          <View className="w-full flex flex-row my-2">
            <FlatList
              className="flex flex-row gap-2 py-2"
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                {
                  id: 1,
                  section: {
                    course: {
                      id: 1,
                      code: "ICS 474",
                      name: "Big Data Analytics",
                      time: "10:00 - 10:30",
                      date: "10/10/2021",
                    },
                  },
                },
              ]}
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
                      <UserRound size={32} color={"white"} />
                    </View>
                    <CustomText styles="text-white-default text-lg font-poppinsBold uppercase">
                      {separateNameNum(item.section.course.code)}
                    </CustomText>
                    <CustomText styles="text-white-default text-md">
                      {item.section.course.time} - {item.section.course.date}
                    </CustomText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
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
