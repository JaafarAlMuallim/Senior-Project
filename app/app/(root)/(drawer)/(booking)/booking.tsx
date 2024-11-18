import { DateSelector } from "@/components/booking/DateSelector";
import { LoadingSpinner } from "@/components/booking/LoadingSpinner";
import { TimeSelector } from "@/components/booking/TimeSelector";
import CustomText from "@/components/CustomText";
import Dropdown from "@/components/Dropdown";
import { AVAILABLE_TIMES } from "@/constants/data";
import { trpc } from "@/lib/trpc";
import { useOfflineStore } from "@/store/offlineStorage";
import { router } from "expo-router";
import { Book, UserIcon } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Animated, Easing, TouchableOpacity, View } from "react-native";

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
  const { user } = useOfflineStore();

  const { data: courseTutor, isLoading: isLoading } =
    trpc.tutors.getTutorsCourse.useQuery();

  const { mutate: addSession } = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      Alert.alert("Session booked successfully");
      router.push("/(root)/(drawer)/(tabs)/(home)/home");
    },
    onError: (e: any) => {
      console.log(e);
      Alert.alert("Error booking session");
    },
  });

  const onSubmit = () => {
    if (!tutor || !course || !date || !time) {
      Alert.alert("Please fill all fields");
    }
    addSession({
      courseId: course,
      date: date!,
      requestedBy: user.user.id,
      time,
      courseName: courseTutor!.find((ct) => ct.course.id === course)?.course
        .name!,
    });
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
    return <LoadingSpinner rotate={rotate} />;
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
          onChange={(item) => setCourse(item.value)}
          placeholder={"Course"}
          icon={<Book />}
          label={"Tutoring Course"}
        />
        {course && (
          <Dropdown
            data={tutorsData}
            onChange={(item) => setTutor(item.value)}
            placeholder={"Tutor"}
            icon={<UserIcon />}
            label={"Tutor"}
          />
        )}
        {tutor && (
          <DateSelector
            dates={uniqueDatesArray}
            selectedDate={date}
            onDateSelect={setDate}
          />
        )}
        {date && (
          <TimeSelector
            availableTimes={AVAILABLE_TIMES}
            selectedTime={time}
            selectedDate={date}
            onTimeSelect={setTime}
          />
        )}
        {time && (
          <TouchableOpacity
            className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light z-0"
            onPress={onSubmit}
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
