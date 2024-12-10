import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Modal,
} from "react-native";
import {
  WeekCalendar,
  LocaleConfig,
  CalendarProvider,
} from "react-native-calendars";
import { format, parseISO } from "date-fns";
import CustomText from "@/components/CustomText";
import { DAYS_OF_WEEK } from "@/constants/data";
import DayColumn from "@/components/DayColumn";
import DaySchedule from "@/components/DaySchedule";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { Class } from "@/models/class";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import TimeSlot from "@/components/TimeSlot";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"],
  dayNamesShort: ["U", "M", "T", "W", "R", "F", "S"],
  today: "Today",
};
const DayMapper = {
  Sunday: "SUN",
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WEN",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
};
const MAPPER = {
  U: "SUN",
  M: "MON",
  T: "TUE",
  W: "WEN",
  R: "THU",
  F: "FRI",
  S: "SAT",
};

const DAYS = ["U", "M", "T", "W", "R", "F", "S"];
LocaleConfig.defaultLocale = "en";

const Schedule = () => {
  const [viewMode, setViewMode] = useState<"Today" | "Weekly">("Today");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const dateObject = parseISO(selectedDate);

  const spinValue = new Animated.Value(0);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { data: semesters, isLoading: semestersLoading } =
    trpc.schedule.getSemesters.useQuery();

  const [semester, setTerm] = useState(semesters?.[0] || "241");

  const { data, isLoading } = trpc.schedule.getSchedule.useQuery({
    semester: semester,
  });

  const dayNum = format(dateObject, "dd");
  const dayName = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const monthYear = format(dateObject, "MMM yyyy");
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "#4561FF" },
  };
  console.log(
    selectedDate,
    new Date().toISOString().substring(0, 10),
    selectedDate == new Date().toISOString().substring(0, 10),
  );

  useEffect(() => {
    if (isLoading || semestersLoading) {
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
  }, [isLoading, semestersLoading]);

  const structuredEvents = useMemo(() => {
    if (!data) return [];
    return DAYS.map((day) => {
      const classes = data.filter((entry) =>
        entry.section.recurrence?.includes(day),
      );
      const mappedDay = MAPPER[day as keyof typeof MAPPER];

      return {
        day: mappedDay,
        classes: classes.map((entry) => {
          const c: Class = {
            id: entry.id,
            title: entry.section.course.name,
            section: entry.section.title,
            start: format(new Date(entry.section.startTime), "HH:mm"),
            end: format(new Date(entry.section.endTime), "HH:mm"),
            location: entry.section.location ?? "N/A",
            instructor: entry.section.instructor ?? "N/A",
          };
          return c;
        }),
      };
    });
  }, [data]);

  if (isLoading || semestersLoading) {
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

  if (!data || !data.length || !structuredEvents.length) {
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
      <View className="flex-col justify-between items-center px-4 py-8 bg-primary-white w-screen">
        <View className="flex-row items-center justify-between w-screen px-5">
          <View className="flex-row items-center">
            <CustomText styles="text-5xl font-poppinsMedium text-primary-black mr-2">
              {dayNum}
            </CustomText>
            <View className="flex-col">
              <CustomText styles="font-poppinsMedium text-lg text-primary-black">
                {dayName}
              </CustomText>
              <CustomText styles="font-poppinsMedium text-lg text-gray-medium">
                {monthYear}
              </CustomText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              setViewMode(viewMode === "Today" ? "Weekly" : "Today")
            }
            className="w-20 bg-fill-default/20 rounded-lg justify-center items-center"
          >
            <CustomText styles="font-poppinsSemiBold text-primary-dark justify-center py-3 px-2">
              {viewMode === "Today" ? "Today" : "Weekly"}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <CalendarProvider date={selectedDate}>
        <WeekCalendar
          firstDay={0}
          current={selectedDate}
          markedDates={markedDates}
          initialDate={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: `${new Date(selectedDate).toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10) ? "white" : "black"}`,
            dayTextColor: "black",
            textDisabledColor: "gray",
            selectedDotColor: "blue",
            todayBackgroundColor: `${new Date(selectedDate).toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10) ? "#4561FF" : "transparent"}`,
            selectedDayBackgroundColor: "#4561FF",
            selectedDayTextColor: "white",
            monthTextColor: "transparent",
            textSectionTitleColor: "gray",
            textDayFontWeight: "bold",
          }}
        />
        {viewMode === "Weekly" ? (
          <ScrollView horizontal={false}>
            <View className="flex-row">
              <View className="w-16">
                <TimeSlot />
              </View>
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-1 flex-row">
                  {DAYS_OF_WEEK.map((day, index) => (
                    <View key={index} className="flex-1 px-0.5">
                      <DayColumn
                        item={
                          structuredEvents.find(
                            (e) =>
                              e.day ===
                              DayMapper[day as keyof typeof DayMapper],
                          ) || {
                            day,
                            classes: [],
                          }
                        }
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <View>
            <View className="flex-row px-3 bg-primary-white w-screen">
              {structuredEvents.find((event) => event.day === dayName)?.classes
                .length && (
                <>
                  <CustomText styles="mr-10 text-gray-medium">Time</CustomText>
                  <CustomText styles="text-gray-medium">Course</CustomText>
                </>
              )}
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 600, position: "relative" }}
            >
              <DaySchedule
                dayName={dayName}
                selectedDate={selectedDate}
                strucutredEvents={structuredEvents}
              />
            </ScrollView>
          </View>
        )}
      </CalendarProvider>
      <Modal
        transparent={true}
        visible={isTermModalVisible}
        animationType="slide"
        onRequestClose={() => setIsTermModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-primary-black opacity-75 z-0" />
          <View className="bg-primary-white w-3/4 rounded-lg p-4 z-10 shadow-lg">
            <CustomText styles="text-xl font-bold mb-4">Select Term</CustomText>
            <ScrollView>
              {semesters?.map((item) => (
                <TouchableOpacity
                  key={item}
                  className="py-2"
                  onPress={() => {
                    setTerm(item);
                    setIsTermModalVisible(false);
                  }}
                >
                  <CustomText
                    styles={cn(
                      `text-lg `,
                      semester === item ? "font-bold" : "font-normal",
                    )}
                  >
                    {item}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              className="mt-4 bg-primary-light py-2 rounded-lg"
              onPress={() => setIsTermModalVisible(false)}
            >
              <CustomText styles="text-center text-primary-white text-lg">
                Close
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Schedule;
