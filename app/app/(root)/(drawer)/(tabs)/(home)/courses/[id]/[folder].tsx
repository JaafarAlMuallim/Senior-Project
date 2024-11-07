import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import {
  Link,
  Redirect,
  Stack,
  router,
  useLocalSearchParams,
} from "expo-router";
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  FlatList,
  Pressable,
} from "react-native";
import {
  ArrowDownNarrowWide,
  EllipsisVertical,
  File,
  Loader2,
  Search,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo } from "react";
import { useCoursesStore } from "@/store/coursesStore";
import { separateNameNum } from "@/lib/utils";
import { trpc } from "@/lib/trpc";

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

const TYPES = [
  {
    id: 1,
    title: "Slides",
    type: "slides",
  },
  {
    id: 2,
    title: "Assignments",
    type: "assignments",
  },
  {
    id: 3,
    title: "Quizzes",
    type: "quizzes",
  },
  {
    id: 4,
    title: "Exams",
    type: "exams",
  },
  {
    id: 5,
    title: "Pictures",
    type: "pictures",
  },
  {
    id: 6,
    title: "Others",
    type: "others",
  },
] as const;

const MAPPING = {
  slides: "SLIDE",
  assignments: "HW",
  book: "BOOK",
  exams: "EXAM",
  quizzes: "QUIZ",
  pictures: "IMG",
  others: "OTHER",
} as const;

const Page = () => {
  const { folder, id } = useLocalSearchParams<{
    folder?: string;
    id?: string;
  }>();
  const { registrations } = useCoursesStore();
  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const { data: material, isLoading } = trpc.courses.getMaterial.useQuery({
    courseId: id!,
    category: MAPPING[folder! as keyof typeof MAPPING],
  });

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
    }
  }, [isLoading]);

  if (!folder || !id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }

  if (isLoading) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedIn>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
            className="flex-1 items-center justify-center"
          >
            <Loader2 className="h-48 w-48" size={96} />
          </Animated.View>
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
          headerShown: true,

          title: `${separateNameNum(registrations.find((reg) => reg.section.course.id === id)?.section.course.code!).toUpperCase()}`,
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />

      {material && material.length ? (
        <View className="h-full w-full flex flex-col p-8 bg-white-default">
          <View className="w-full flex flex-row justify-between items-center">
            <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
              {TYPES.find((t) => t.type === folder)?.title}
            </CustomText>
            <View className="flex flex-row gap-2">
              <TouchableOpacity>
                <ArrowDownNarrowWide size={28} color="#4561FF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Search size={28} color="#4561FF" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex flex-col my-2">
            <FlatList
              showsVerticalScrollIndicator={false}
              className="flex flex-col py-2"
              data={material}
              ItemSeparatorComponent={() => <View className="h-4" />}
              renderItem={({ item }) => {
                return (
                  <View className="bg-primary-light h-16 p-4 rounded-xl flex justify-between items-center shadow-sm shadow-gray-900">
                    <Pressable
                      onPress={() => {
                        router.push(
                          `/(root)/(drawer)/(tabs)/(home)/courses/[id]/file?name=${item.name}&file=${item.url}`,
                        );
                      }}
                    >
                      <View className="flex flex-col">
                        <View className="flex-row w-full justify-between items-center">
                          <View className="flex flex-row justify-center items-center">
                            <File size={32} color={"white"} />
                            <CustomText styles="ml-4 text-white-default text-lg font-poppinsBold">
                              {item.name}
                            </CustomText>
                          </View>
                          <CustomText styles="ml-12 text-white-default text-md">
                            {item.createdAt.substring(0, 10)}
                          </CustomText>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ) : (
        <View className="w-full flex justify-center flex-1">
          <CustomText styles="text-2xl text-center">
            No Material Available in{" "}
            {TYPES.find((t) => t.type === folder)?.title}
          </CustomText>
          <Link
            className="text-2xl text-center text-primary-light underline"
            href={`/(root)/(drawer)/(tabs)/(home)/courses/${id}/upload?type=${folder}`}
          >
            <CustomText>Upload New Material</CustomText>
          </Link>
        </View>
      )}
    </>
  );
};
export default Page;
