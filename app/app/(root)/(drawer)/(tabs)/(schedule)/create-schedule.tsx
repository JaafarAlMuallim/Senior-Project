import CustomText from "@/components/CustomText";
import Dropdown, { OptionItem } from "@/components/Dropdown";
import { MAJORS, STANDINGS, UNIVERSITIES } from "@/constants/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "@/store/store";
import { Bolt, GraduationCap, University } from "lucide-react-native";
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { cn } from "@/lib/utils";

const DEPTS = [
  { label: "Computer Science", value: "cs" },
  { label: "Mechanical Engineering", value: "me" },
  { label: "Electrical Engineering", value: "ee" },
  { label: "Civil Engineering", value: "ce" },
  { label: "Chemical Engineering", value: "che" },
  { label: "Biomedical Engineering", value: "bme" },
  { label: "Aerospace Engineering", value: "ae" },
  { label: "Materials Science", value: "ms" },
  { label: "Industrial Engineering", value: "ie" },
  { label: "Environmental Engineering", value: "env" },
];

const SCHEDULE = [
  {
    section: "ICS 104 - 01",
    time: "8:00-9:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 02",
    time: "9:00-10:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 03",
    time: "10:00-11:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 04",
    time: "11:00-12:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 05",
    time: "12:00-1:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 06",
    time: "1:00-2:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 07",
    time: "2:00-3:00",
    days: "UT",
  },
  {
    section: "ICS 104 - 08",
    time: "3:00-4:00",
    days: "UT",
  },
  {
    section: "ICS 202 - 01",
    time: "8:00-9:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 02",
    time: "9:00-10:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 03",
    time: "10:00-11:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 04",
    time: "11:00-12:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 05",
    time: "12:00-1:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 06",
    time: "1:00-2:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 07",
    time: "2:00-3:00",
    days: "UTR",
  },
  {
    section: "ICS 202 - 08",
    time: "3:00-4:00",
    days: "UTR",
  },
  {
    section: "ICS 204 - 01",
    time: "8:00-9:00",
    days: "UTR",
  },
  {
    section: "ICS 204 - 02",
    time: "9:00-10:00",
    days: "UTR",
  },
  {
    section: "ICS 253 - 01",
    time: "10:00-11:00",
    days: "MW",
  },
  {
    section: "ICS 253 - 01",
    time: "10:00-11:00",
    days: "MW",
  },
];

const checkConflict = (course: Course, courses: Course[]) => {
  const courseDays = course.days.split("");
  let flag = false;
  courses?.forEach((c) => {
    const cDays = c.days.split("");
    if (
      courseDays.some((day) => cDays.includes(day)) &&
      c.time === course.time
    ) {
      flag = true;
    }
  });
  return flag;
};
type Course = {
  section: string;
  time: string;
  days: string;
};

const Page = () => {
  // const { user, setUser } = useUserStore();
  const [dept, setDept] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  return (
    <View className="flex flex-col mt-5 flex-1 px-4">
      <Dropdown
        data={DEPTS}
        onChange={(item) => setDept(item.value)}
        placeholder={"Select Department"}
        value={DEPTS.find((uni) => uni.value === dept)}
        icon={<University />}
        label={"Department"}
      />
      {dept && (
        <>
          <View className="flex flex-col mt-5">
            <View className="w-full flex-row gap-1">
              <View className="rounded-3xl bg-fill-default px-2 py-3 w-28 justify-center items-center">
                <CustomText styles="text-white-default text-lg font-poppinsSemiBold">
                  Sections
                </CustomText>
              </View>
              <View className="rounded-3xl bg-fill-default px-2 py-3 w-28 justify-center items-center">
                <CustomText styles="text-white-default text-lg font-poppinsSemiBold">
                  Time
                </CustomText>
              </View>
              <View className="rounded-3xl bg-fill-default px-2 py-3 w-28 items-center">
                <CustomText styles="text-white-default text-lg font-poppinsSemiBold">
                  Days
                </CustomText>
              </View>
              <View className="rounded-full bg-fill-default w-12 items-center justify-center">
                <CustomText styles="text-white-default text-lg font-poppinsSemiBold">
                  Add
                </CustomText>
              </View>
            </View>
          </View>
          {
            <FlatList
              data={SCHEDULE}
              renderItem={({ item }) => {
                return (
                  <View className="flex flex-col mt-5">
                    <View className="w-full flex-row gap-1">
                      <View className="rounded-3xl bg-white-default border border-primary-light px-2 py-3 w-28 justify-center items-center">
                        <CustomText styles="text-primary-light border text-md font-poppinsSemiBold">
                          {item.section}
                        </CustomText>
                      </View>
                      <View className="rounded-3xl bg-white-default border border-primary-light px-2 py-3 w-28 items-center justify-center">
                        <CustomText styles="text-primary-light text-md font-poppinsSemiBold">
                          {item.time}
                        </CustomText>
                      </View>
                      <View className="rounded-3xl bg-white-default border border-primary-light px-2 py-3 w-28 justify-center items-center">
                        <CustomText styles="text-primary-light text-md font-poppinsSemiBold">
                          {item.days}
                        </CustomText>
                      </View>
                      <View
                        className={cn(
                          "rounded-full bg-white-default px-2 py-3 w-12 items-center justify-center border border-primary-light ",
                          {
                            "bg-primary-light": courses?.find(
                              (course) => course.section === item.section,
                            ),
                          },
                        )}
                      >
                        <TouchableOpacity
                          className="flex flex-row items-center justify-center"
                          onPress={() => {
                            const checker = checkConflict(item, courses!);
                            if (
                              courses?.find(
                                (course) => course.section === item.section,
                              )
                            ) {
                              setCourses((prev) =>
                                prev?.filter(
                                  (course) => course.section !== item.section,
                                ),
                              );
                              return;
                            } else if (
                              courses.find(
                                (course) =>
                                  course.section.substring(0, 6) ===
                                  item.section.substring(0, 6),
                              )
                            ) {
                              // filter the previous and add the new one
                              const newCourses = courses?.filter(
                                (course) =>
                                  course.section.substring(0, 6) !==
                                  item.section.substring(0, 6),
                              );
                              if (checker) {
                                Alert.alert(
                                  "Conflict",
                                  "You have a conflict with this course",
                                );
                                return;
                              }
                              setCourses((prev) => [...newCourses!, item]);
                              return;
                            }

                            if (checker) {
                              Alert.alert(
                                "Conflict",
                                "You have a conflict with this course",
                              );
                              return;
                            }
                            if (!checker) {
                              setCourses((prev) => [...prev!, item]);
                            } else {
                            }
                          }}
                        >
                          <Ionicons
                            name={
                              courses?.find(
                                (course) => course.section === item.section,
                              )
                                ? "checkmark"
                                : "add"
                            }
                            size={24}
                            color={
                              courses?.find(
                                (course) => course.section === item.section,
                              )
                                ? "white"
                                : "#4561FF"
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          }
        </>
      )}
    </View>
  );
};

export default Page;
