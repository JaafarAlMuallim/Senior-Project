import CustomText from "@/components/CustomText";
import { toast } from "@/components/ui/toast";
import { trpc } from "@/lib/trpc";
import { useUserStore } from "@/store/store";
import { Picker } from "@react-native-picker/picker";
import { format, set, sub } from "date-fns";
import { router } from "expo-router";
import React, { Suspense, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

const HelpSessionModal = () => {
  const { tutor } = useUserStore();
  const utils = trpc.useUtils();

  const [selectedCourse, setSelectedCourse] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");

  const { data: tutorCourses } = trpc.tutors.getTutorsCourseById.useQuery(
    undefined,
    {
      enabled: !!tutor?.id,
    },
  );

  const { mutate: createSession } = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: `Session ${date.toString()} at ${time} created successfully`,
        ms: 3000, // 3 seconds
        variant: "success",
      });
      utils.sessions.getSessions.invalidate();
      router.push("/");
    },
  });

  const handleDateChange = (params: { date: DateType }) => {
    if (params.date) {
      const [pickedDate, pickedTime] = params.date.toString().split(" ");
      const splitted = pickedTime.split(":");
      setDate(
        set(new Date(pickedDate), {
          hours: parseInt(splitted[0]),
          minutes: parseInt(splitted[1]),
        }),
      );
      setTime(pickedTime);
    }
  };

  const handleCreateSession = () => {
    const selectedCourseObj = tutorCourses?.find(
      (course) => course.id === selectedCourse,
    );
    if (!selectedCourse || !tutor?.id || !selectedCourseObj) {
      Alert.alert("Error", "Please select a valid course");
      return;
    }

    createSession({
      time: format(date, "HH:mm"),
      courseId: selectedCourseObj.course.id,
      date: date,
      courseName: selectedCourseObj.course.name,
      requestedBy: null,
      status: "ACCEPTED",
    });
  };

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View className="h-full bg-white-default justify-start items-center py-8 gap-4">
        <Picker
          selectedValue={selectedCourse}
          onValueChange={setSelectedCourse}
          style={{ width: 300 }}
        >
          <Picker.Item label="Select a course" value="" />
          {tutorCourses?.map((course) => (
            <Picker.Item
              key={course.id}
              label={course.course.code.toUpperCase()}
              value={course.id}
            />
          ))}
        </Picker>
        <View className="flex gap-4 justify-center items-center">
          <View className="px-8">
            <DateTimePicker
              date={date}
              onChange={handleDateChange}
              timePicker={true}
              mode="single"
              startYear={2024}
              endYear={2025}
              minDate={sub(new Date(), { days: 1 })}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCreateSession}
          className="flex flex-col justify-center items-center bg-info-default p-2 rounded-lg"
        >
          <CustomText styles="text-toast-info text-2xl">
            Create Session
          </CustomText>
        </TouchableOpacity>
      </View>
    </Suspense>
  );
};

export default HelpSessionModal;
