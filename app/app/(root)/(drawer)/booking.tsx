import CustomText from "@/components/CustomText";
import Dropdown from "@/components/Dropdown";
import { AVAILABLE_TIMES } from "@/constants/data";
import { Book, Loader2, UserIcon } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Animated, Easing, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import trpc from "@/utils/trpc";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

const BookSession = () => {
  const [course, setCourse] = useState("");
  const [tutor, setTutor] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { data: courseTutor, isLoading: isLoading } = useQuery({
    queryKey: ["coursesTutor"],
    queryFn: () => trpc.getTutors.query(),
  });

  const { mutate: addSession, isError } = useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data: {
      tutorId: string;
      courseId: string;
      date: Date;
      time: string;
    }) => trpc.createSession.mutate(data),

    onSuccess: () => {
      Alert.alert("Session booked successfully");
      router.push("/(root)/(drawer)/(tabs)/home");
    },
    onError: (e: any) => {
      console.log(e);
      Alert.alert("Error booking session");
    },
  });
  console.log(isError);
  console.log(date);

  const onSubmit = () => {
    if (!tutor || !course || !date || !time) {
      Alert.alert("Please fill all fields");
    }
    addSession({ tutorId: tutor, courseId: course, date: date!, time });
  };

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
  }, [courseTutor, isLoading]);

  const coursesData = useMemo(() => {
    const uniqueCourses = new Map<string, any>();
    courseTutor?.forEach((courseTutor) => {
      uniqueCourses.set(courseTutor.course.id, courseTutor);
    });

    return Array.from(uniqueCourses.values()).map((courseTutor) => ({
      label: courseTutor.course.name,
      value: courseTutor.course.id,
    }));
  }, [courseTutor])!;

  const tutorsData = useMemo(() => {
    return courseTutor
      ?.filter((courseTutor) => courseTutor.course.id === course)
      ?.map((courseTutor) => ({
        label: courseTutor.tutor.user.name,
        value: courseTutor.tutorId,
      }));
  }, [courseTutor, course])!;

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
  const uniqueDates = new Map<string, any>();
  const uniqueDatesArray = AVAILABLE_TIMES.filter((date) => {
    if (!uniqueDates.has(date.date.toDateString())) {
      uniqueDates.set(date.date.toDateString(), true);
      return true;
    }
    return false;
  });

  return (
    <View className="py-8">
      <View className="flex flex-col mt-8 p-4">
        <Dropdown
          data={coursesData}
          onChange={(item) => {
            setCourse(item.value);
          }}
          placeholder={"Course"}
          icon={<Book />}
          label={"Tutoring Course"}
        />
        {course && (
          <Dropdown
            data={tutorsData}
            onChange={(item) => {
              setTutor(item.value);
            }}
            placeholder={"Tutor"}
            icon={<UserIcon />}
            label={"Tutor"}
          />
        )}
        {tutor && (
          <View>
            <CustomText styles="text-lg text-black-default mb-2">
              Select Date
            </CustomText>
            <FlatList
              className="flex flex-row"
              horizontal
              showsHorizontalScrollIndicator={false}
              data={uniqueDatesArray}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mx-2"
                  onPress={() => {
                    setDate(item.date);
                  }}
                >
                  <View
                    className={cn(
                      "border h-28 w-20 rounded-lg",
                      date?.toISOString() === item.date.toISOString()
                        ? "bg-primary-light border-primary-light"
                        : "bg-white border-gray-200",
                    )}
                  >
                    <View className="h-full flex flex-col justify-between items-center py-4">
                      <CustomText
                        styles={cn(
                          "text-lg flex font-poppinsBlack text-3xl pt-4",
                          date?.toISOString() === item.date.toISOString()
                            ? "text-white-default"
                            : "text-gray-500",
                        )}
                      >
                        {item.date.toDateString().slice(8, 10)}
                      </CustomText>
                      <CustomText
                        styles={cn(
                          "font-poppinsBlack text-lg",
                          date?.toISOString() === item.date.toISOString()
                            ? "text-white-default"
                            : "text-gray-500",
                        )}
                      >
                        {item.date.toDateString().slice(0, 3)}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {date && (
          <View className="my-8">
            <CustomText styles="text-lg text-black-default mb-2">
              Available Time
            </CustomText>
            <FlatList
              className="flex flex-row"
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              data={AVAILABLE_TIMES.filter(
                (availableDate) =>
                  date?.toISOString() === availableDate.date.toISOString(),
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mx-2 my-2"
                  onPress={() => {
                    setTime(item.time);
                  }}
                >
                  <View
                    className={cn(
                      "border h-12 w-28 rounded-lg justify-center items-center",
                      time === item.time
                        ? "border-primary-light bg-primary-light"
                        : "border-gray-200",
                    )}
                  >
                    <CustomText
                      styles={cn(
                        "text-lg font-poppinsBlack",
                        time === item.time
                          ? "text-white-default"
                          : "text-gray-500",
                      )}
                    >
                      {item.time}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {time && (
          <TouchableOpacity
            className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light z-0"
            onPress={() => {
              onSubmit();
            }}
          >
            <CustomText styles="text-white-default font-poppinsBold text-lg">
              Submit
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BookSession;
