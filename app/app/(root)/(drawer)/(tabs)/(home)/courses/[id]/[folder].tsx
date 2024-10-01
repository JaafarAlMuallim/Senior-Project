import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import {
  ArrowDownNarrowWide,
  EllipsisVertical,
  File,
  Search,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";

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
    title: "Class Notes",
    type: "class-notes",
  },
  {
    id: 2,
    title: "Slides",
    type: "slides",
  },
  {
    id: 3,
    title: "Assignments",
    type: "assignments",
  },
  {
    id: 4,
    title: "Quizzes",
    type: "quizzes",
  },
  {
    id: 5,
    title: "Exams",
    type: "exams",
  },
  {
    id: 6,
    title: "Labs",
    type: "labs",
  },
  {
    id: 7,
    title: "Projects",
    type: "projects",
  },
  {
    id: 8,
    title: "Pictures",
    type: "pictures",
  },
  {
    id: 9,
    title: "Others",
    type: "others",
  },
];

const FILES = [
  {
    id: 1,
    title: "Lecture 1",
    description: "This is a lecture about computer science.",
    type: "class-notes",
    date: "2022-01-01",
  },
  {
    id: 2,
    title: "Lecture 2",
    description: "This is a lecture about computer science.",
    type: "class-notes",
    date: "2022-01-04",
  },
  {
    id: 3,
    title: "Assignment 1",
    description: "This is an assignment about computer science.",
    type: "assignments",
    date: "2022-01-01",
  },
  {
    id: 4,
    title: "Assignment 2",
    description: "This is an assignment about computer science.",
    type: "assignments",
    date: "2022-02-01",
  },
  {
    id: 5,
    title: "Quiz 1",
    description: "This is a quiz about computer science.",
    type: "quizzes",
    date: "2022-01-01",
  },
  {
    id: 6,
    title: "Quiz 2",
    description: "This is a quiz about computer science.",
    type: "quizzes",
  },
  {
    id: 7,
    title: "Midterm",
    description: "This is a midterm about computer science.",
    type: "exams",
    date: "2022-01-01",
  },
  {
    id: 8,
    title: "Final",
    description: "This is a final about computer science.",
    type: "exams",
  },
  {
    id: 9,
    title: "Lab 1",
    description: "This is a lab about computer science.",
    type: "labs",
    date: "2022-01-01",
  },
  {
    id: 10,
    title: "Lab 2",
    description: "This is a lab about computer science.",
    type: "labs",
  },
  {
    id: 11,
    title: "Project 1",
    description: "This is a project about computer science.",
    type: "projects",
    date: "2022-01-01",
  },
  {
    id: 12,
    title: "Project 2",
    description: "This is a project about computer science.",
    type: "projects",
  },
  {
    id: 13,
    title: "Picture 1",
    description: "This is a picture about computer science.",
    type: "pictures",
    date: "2022-01-01",
  },
  {
    id: 14,
    title: "Picture 2",
    description: "This is a picture about computer science.",
    type: "pictures",
  },
  {
    id: 15,
    title: "Other 1",
    description: "This is an other about computer science.",
    type: "others",
    date: "2022-01-01",
  },
];

const Page = () => {
  const { folder, id } = useLocalSearchParams<{
    folder?: string;
    id?: string;
  }>();
  if (!folder || !id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }
  const files = useMemo(() => {
    return FILES.filter((file) => file.type === folder);
  }, [folder, id]);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          // title: `${COURSES.find((course) => course.id === Number(id))?.courseCode} - ${TYPES.find((t) => t.type === folder)?.title}`,
          title: `${COURSES.find((course) => course.id === Number(id))?.courseCode}`,
          headerTitleStyle: {
            color: "#4561FF",
            fontSize: 20,
            fontFamily: "Poppins-Bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
      {folder && id && (
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
              data={files}
              ItemSeparatorComponent={() => <View className="h-4" />}
              renderItem={({ item }) => {
                return (
                  <View className="bg-primary-light h-16 p-4 rounded-xl flex justify-between items-center shadow-sm shadow-gray-900">
                    <View className="flex flex-col">
                      <View className="flex-row w-full justify-between items-center">
                        <View className="flex flex-row justify-center items-center">
                          <File size={32} color={"white"} />
                          <CustomText styles="ml-4 text-white-default text-lg font-poppinsBold">
                            {item.title}
                          </CustomText>
                        </View>
                        <CustomText styles="ml-12 text-white-default text-md">
                          {item.date}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};
export default Page;
