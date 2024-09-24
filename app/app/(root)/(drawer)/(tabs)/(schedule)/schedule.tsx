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
import CustomText from "@/components/CustomText";
import { DAYS_OF_WEEK, EVENTS } from "@/constants/data";
import DayColumn from "@/components/DayColumn";
import TimeSlot from "@/components/TimeSlot";
import DaySchedule from "@/components/DaySchedule";

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
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const ScheduleScreen2 = () => {
  const [viewMode, setViewMode] = useState<"Today" | "Weekly">("Today");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const dateObject = parseISO(selectedDate);
  const [term, setTerm] = useState("241");

  const dayNum = format(dateObject, "dd");
  const dayName = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const monthYear = format(dateObject, "MMM yyyy");
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);
  const terms = ["241", "242", "243"];

  const fullDayName = format(parseISO(selectedDate), "EEEE");

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "#4561FF" },
  };

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
                          EVENTS.find((e) => e.day === day) || {
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
              {EVENTS.find((event) => event.day === dayName)?.classes
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
              <DaySchedule dayName={fullDayName} selectedDate={selectedDate} />
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
              className="mt-4 bg-primary-light py-2 rounded-lg"
              onPress={() => setIsTermModalVisible(false)}
            >
              <Text className="text-center text-primary-white text-lg">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ScheduleScreen2;
