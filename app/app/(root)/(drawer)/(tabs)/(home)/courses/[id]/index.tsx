import CustomText from "@/components/CustomText";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View, FlatList } from "react-native";
import {
  ArrowDownNarrowWide,
  EllipsisVertical,
  FolderClosed,
  Search,
  Upload,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCoursesStore } from "@/store/coursesStore";
import { separateNameNum } from "@/lib/utils";

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
];

const Page = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { registrations } = useCoursesStore();

  if (!id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push(
                  `/(root)/(drawer)/(tabs)/(home)/courses/${id}/upload`,
                );
              }}
              // onPress={pickFiles}
            >
              <Upload size={24} color={"#4561FF"} />
            </TouchableOpacity>
          ),
        }}
      />
      {id && (
        <View className="h-full w-full flex flex-col p-8 bg-white-default">
          <View className="w-full flex flex-row justify-between items-center">
            <CustomText styles={"text-primary-light text-3xl font-poppinsBold"}>
              Folders
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
              className="flex flex-col py-2"
              data={TYPES}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-4" />}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    className="bg-primary-light h-32 p-4 rounded-xl flex justify-between shadow-sm shadow-gray-900"
                    onPress={() => {
                      router.push(
                        `/(root)/(drawer)/(tabs)/(home)/courses/${id}/${item.type}`,
                      );
                    }}
                  >
                    <View>
                      <View className="flex flex-col">
                        <View className="flex-row w-full justify-between">
                          <View className="flex flex-row justify-center items-center">
                            <FolderClosed size={32} color={"white"} />
                            <CustomText styles="ml-4 text-white-default text-lg font-poppinsBold">
                              {item.title}
                            </CustomText>
                          </View>
                          <EllipsisVertical size={32} color={"white"} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
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
