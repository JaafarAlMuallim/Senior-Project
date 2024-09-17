// ScheduleScreen.tsx
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import {
  WeekCalendar,
  CalendarProvider,
  LocaleConfig,
} from "react-native-calendars";
import { format, parseISO } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

LocaleConfig.locales["fr"] = {
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
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "fr";

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const calculatePositionAndHeight = (start: string, end: string) => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const top = (startMinutes - timeToMinutes("08:00")) * 1.4;
  const height = (endMinutes - startMinutes) * 1.25;
  return { top, height };
};

const calculateDuration = (start: string, end: string) => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  return endInMinutes - startInMinutes;
};

const ScheduleScreen2: React.FC = () => {
  const [viewMode, setViewMode] = useState<"Today" | "Weekly">("Today");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const dateObject = parseISO(selectedDate);
  const dayNum = format(dateObject, "dd");
  const dayName = dateObject.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const monthYear = format(dateObject, "MMM yyyy");
  const [term, setTerm] = useState("231");
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);
  const terms = ["231", "232", "241"];

  const fullDayName = format(parseISO(selectedDate), "EEEE");
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
  ];
  const events = [
    {
      day: "Sunday",
      classes: [
        {
          id: "1",
          title: "MATH 101",
          section: "06",
          start: "09:00",
          end: "9:50",
          location: "6-135",
          instructor: "TAMEM AL-SHORMAN",
        },
        {
          id: "2",
          title: "PHYS 101",
          section: "06",
          start: "10:00",
          end: "10:50",
          location: "6-235",
          instructor: "A GHANNAM",
        },
      ],
    },
    {
      day: "Monday",
      classes: [
        {
          id: "1",
          title: "MATH 101",
          section: "06",
          start: "09:00",
          end: "09:50",
          location: "6-135",
          instructor: "TAMEM AL-SHORMAN",
        },
        {
          id: "2",
          title: "PHYS 101",
          section: "06",
          start: "10:00",
          end: "10:50",
          location: "6-235",
          instructor: "A GHANNAM",
        },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        {
          id: "3",
          title: "MATH 101",
          section: "06",
          start: "09:00",
          end: "09:50",
          location: "6-135",
          instructor: "TAMEM AL-SHORMAN",
        },
        {
          id: "4",
          title: "PHYS 101",
          section: "06",
          start: "10:00",
          end: "10:50",
          location: "6-235",
          instructor: "A GHANNAM",
        },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        {
          id: "1",
          title: "MATH 101",
          section: "06",
          start: "09:00",
          end: "09:50",
          location: "6-135",
          instructor: "TAMEM AL-SHORMAN",
        },
        {
          id: "2",
          title: "PHYS 101",
          section: "57",
          start: "10:00",
          end: "13:30",
          location: "6-235",
          instructor: "A GHANNAM",
        },
      ],
    },
    {
      day: "Thursday",
      classes: [
        {
          id: "1",
          title: "MATH 101",
          section: "06",
          start: "09:00",
          end: "09:50",
          location: "6-135",
          instructor: "TAMEM AL-SHORMAN",
        },
        {
          id: "2",
          title: "PHYS 101",
          section: "06",
          start: "10:00",
          end: "10:50",
          location: "6-235",
          instructor: "A GHANNAM",
        },
      ],
    },
  ];

  const renderClassItem = ({ item, day }: { item: any; day: string }) => {
    const currentDay = format(new Date(), "EEEE");
    const isCurrentDay = day === currentDay;
    const { top, height } = calculatePositionAndHeight(item.start, item.end);

    return (
      <View
        className={`absolute left-0 right-0 py-1 rounded-lg shadow-lg ${isCurrentDay ? "bg-primary-default" : "bg-white-light"}`}
        style={{ top, height }}
      >
        <Text
          className={`${isCurrentDay ? "text-primary-white" : "text-primary-black"} text-center tracking-tighter font-bold text-xs`}
        >
          {item.title}
        </Text>
        <Text
          className={`${isCurrentDay ? "text-primary-white" : "text-primary-black"} text-xs p-1`}
        >
          {item.location}
        </Text>
      </View>
    );
  };

  const renderDailyClassItem = ({
    item,
    isCurrentClass,
  }: {
    item: any;
    isCurrentClass: boolean;
  }) => {
    const duration = calculateDuration(item.start, item.end);
    const height = duration * 3;

    return (
      <View
        className={`flex-row justify-center p-3 mb-4 rounded-lg shadow`}
        style={{ height: height }}
      >
        {/* Time section */}
        <View className="w-16">
          <Text className="text-primary-black text-sm">{item.start}</Text>
          <Text className="text-gray-medium text-sm">{item.end}</Text>
        </View>

        {/* Course section */}
        <View
          className={`flex-1 ml-4 rounded-2xl p-4 shadow ${isCurrentClass ? "bg-primary-default" : "bg-white-light"}`}
          style={{ height: height }}
        >
          <Text
            className={`font-bold text-lg ${isCurrentClass ? "text-primary-white" : "text-primary-black"}`}
          >
            {item.title}
          </Text>
          <Text
            className={`text-sm font-semibold ${isCurrentClass ? "text-primary-white" : "text-primary-black"}`}
          >
            Section: {item.section}
          </Text>
          <View className="flex-row items-center pt-3">
            <Ionicons
              name="location-outline"
              size={12}
              color={isCurrentClass ? "white" : "gray"}
            />
            <Text
              className={`text-sm ml-2 font-light ${isCurrentClass ? "text-primary-white" : "text-primary-black"}`}
            >
              {item.location}
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <Ionicons
              name="person-outline"
              size={12}
              color={isCurrentClass ? "white" : "gray"}
            />
            <Text
              className={`text-sm ml-2 font-light ${isCurrentClass ? "text-primary-white" : "text-primary-black"}`}
            >
              {item.instructor}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDayColumn = ({ item }: { item: any }) => {
    return (
      <View className="flex-1 relative" style={{ height: 600 }}>
        {item.classes.map(
          (classItem: {
            id: string;
            title: string;
            start: string;
            end: string;
            location: string;
          }) => (
            <View key={classItem.id}>
              {renderClassItem({ item: classItem, day: item.day })}
            </View>
          ),
        )}
      </View>
    );
  };

  const renderDaySchedule = (selectedDay: string) => {
    const daySchedule = events.find((event) => event.day === selectedDay);

    if (daySchedule) {
      return (
        <View className="py-4">
          {daySchedule.classes.map((classItem) => {
            const isCurrentClass = false;
            return renderDailyClassItem({ item: classItem, isCurrentClass });
          })}
        </View>
      );
    } else {
      return (
        <Text className="flex-1 justify-center p-5">
          No classes for {selectedDay}
        </Text>
      );
    }
  };

  const renderTimeSlot = () => (
    <View className="py-4">
      {timeSlots.map((time) => (
        <Text key={time} className="text-xs font-bold text-center mb-14">
          {time}
        </Text>
      ))}
    </View>
  );

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "#4561FF" },
  };

  return (
    <SafeAreaView className="flex-1 pt-12 bg-primary-white">
      <View className="flex-column justify-between items-center px-4 pb-3 bg-primary-white w-screen">
        <View className="flex flex-row items-center justify-between w-screen p-2">
          <TouchableOpacity
            className="bg-schedule-term rounded-lg justify-center"
            onPress={() => setIsTermModalVisible(true)}
          >
            <Text className="text-base font-poppinsBold font-bold text-primary-dark justify-center py-2 px-3">
              {term}
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary-dark">Schedule</Text>
          <TouchableOpacity className="bg-primary-white p-0.5 rounded-full border-2 border-primary-dark">
            <Ionicons name="add" size={18} color="#3044FF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between w-screen px-5">
          <View className="flex-row">
            <Text className="text-5xl font-poppinsBold font-bold text-primary-black mt-2 mr-2">
              {dayNum}
            </Text>
            <View className="flex-column">
              <Text className="text-base font-poppinsSemiBold font-bold text-primary-black mt-1">
                {dayName}
              </Text>
              <Text className="text-base font-poppinsSemiBold font-bold text-gray-medium">
                {monthYear}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              setViewMode(viewMode === "Today" ? "Weekly" : "Today")
            }
            className="px-2 py-1 bg-schedule-term rounded-md"
          >
            <Text className="text-base font-poppinsBold font-bold text-primary-dark justify-center py-1 px-2">
              {viewMode === "Today" ? "Today" : "Weekly"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CalendarProvider date={selectedDate}>
        <WeekCalendar
          firstDay={0}
          current={selectedDate}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: "red",
            dayTextColor: "black",
            textDisabledColor: "gray",
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
              <View className="w-16">{renderTimeSlot()}</View>
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-1 flex-row">
                  {daysOfWeek.map((day, index) => (
                    <View key={index} className="flex-1 px-0.5">
                      {renderDayColumn({
                        item: events.find((e) => e.day === day) || {
                          day,
                          classes: [],
                        },
                      })}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <View>
            <View className="flex-row px-3 bg-primary-white w-screen">
              <Text className="mr-10 text-gray-medium">Time</Text>
              <Text className="text-gray-medium">Course</Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 600, position: "relative" }}
            >
              {renderDaySchedule(fullDayName)}
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
            <Text className="text-xl font-bold mb-4">Select Term</Text>

            <ScrollView>
              {terms.map((item) => (
                <TouchableOpacity
                  key={item}
                  className="py-2"
                  onPress={() => {
                    setTerm(item);
                    setIsTermModalVisible(false);
                  }}
                >
                  <Text
                    className={`text-lg ${term === item ? "font-bold" : "font-normal"}`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="mt-4 bg-primary-default py-2 rounded-lg"
              onPress={() => setIsTermModalVisible(false)}
            >
              <Text className="text-center text-primary-white text-lg">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen2;
