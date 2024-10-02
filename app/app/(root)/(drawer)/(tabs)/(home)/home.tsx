import CustomText from "@/components/CustomText";
import { useUserStore } from "@/store/store";
import { trpc } from "@/lib/trpc";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import { EllipsisVertical, FolderClosed, Loader2 } from "lucide-react-native";
import { useEffect } from "react";
import {
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { separateNameNum } from "@/lib/utils";
import { useCoursesStore } from "@/store/coursesStore";

const COURSES = [
  {
    id: 1,
    title: "Introdudction to Python",
    description: "This is a course about computer science.",
    courseCode: "ICS 104",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    description: "This is a course about computer science.",
    courseCode: "ICS 202",
  },
  {
    id: 3,
    title: "Discrete Mathematics",
    description: "This is a course about computer science.",
    courseCode: "ICS 253",
  },
  {
    id: 4,
    title: "Computer Organization and Architecture",
    description: "This is a course about computer science.",
    courseCode: "COE 301",
  },
];

const Page = () => {
  const { user } = useUser();
  const { setRegistrations } = useCoursesStore();
  const { user: userStore, setUser } = useUserStore();
  const spinValue = new Animated.Value(0);

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
    <View className="h-full flex flex-col p-8 pr-0 bg-white-default">
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
                className="bg-primary-light w-40 h-32 p-4 rounded-xl flex justify-between shadow-sm shadow-gray-900"
                onPress={() => {
                  router.push(`/courses/${item.id}`);
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
                    router.push(`/courses/${item.id}`);
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
    </View>
  );
};

// <View className="flex-1">
//   <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//   <Text>{user?.fullName}</Text>
//   <Image source={{ uri: user?.imageUrl }} className="h-4 w-4" />
//   <Text>{user?.phoneNumbers[0]?.phoneNumber ?? "None"}</Text>
//   {data && (
//     <View>
//       <Text>{data?.major}</Text>
//       <Text>{data?.phone}</Text>
//       <Text>{data?.university}</Text>
//       <Text>{data?.standing}</Text>
//     </View>
//   )}
// </View>
// <View className="">
//   <TouchableOpacity
//     className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-danger-700"
//     onPress={() => signOut()}
//   >
//     <CustomText styles="font-poppinsBold text-lg text-white-default">
//       Sign Out
//     </CustomText>
//   </TouchableOpacity>
// </View>

export default Page;
