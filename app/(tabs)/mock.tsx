// ScheduleScreen.tsx

import React, { useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import {
  AgendaList,
  WeekCalendar,
  CalendarProvider,
} from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { format, parseISO, startOfWeek, addDays } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

import DailyView from "./mockComponents/DailyView";
import WeeklyView from "./mockComponents/WeeklyView";
import { EventData } from "./mockComponents/types";

// Configure Locale
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
  dayNames: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "fr";

// Styled Components
const ItemContainer = styled(
  SafeAreaView,
  "bg-default-white p-2 my-1 rounded-xl flex-row",
);

const AgendaItem = ({
  item,
  isWeeklyView,
}: {
  item: any;
  isWeeklyView: boolean;
}) => (
  <ItemContainer
    style={
      isWeeklyView
        ? { padding: 2, marginVertical: 1 } // Reduce padding and margin in weekly view
        : {}
    }
  >
    <Text
      className="text-gray-500 text-sm"
      style={{
        width: isWeeklyView ? 35 : 80,
        fontSize: isWeeklyView ? 10 : 14,
      }}
      numberOfLines={1}
    >
      {`${item.startTime} - ${item.endTime}`}
    </Text>
    <SafeAreaView
      className="bg-white-default shadow flex-1 ml-1"
      style={{ marginLeft: isWeeklyView ? 2 : 8 }}
    >
      <Text
        className="text-primary-dark"
        style={{ fontSize: isWeeklyView ? 10 : 16 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
      <Text
        className="text-secondary-gray"
        style={{ fontSize: isWeeklyView ? 8 : 14 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.location}
      </Text>
      {!isWeeklyView && (
        <Text className="text-secondary-gray">{item.instructor}</Text>
      )}
    </SafeAreaView>
  </ItemContainer>
);

// Events List
const events: EventData[] = [
  {
    id: "1",
    start: new Date("2024-09-22 09:00"), // Sunday
    end: new Date("2024-09-22 10:00"),
    title: "MATH 101",
    location: "6-135",
    instructor: "TAMEM AL-SHORMAN",
  },
  {
    id: "2",
    start: new Date("2024-09-23 10:00"), // Monday
    end: new Date("2024-09-23 11:00"),
    title: "PHYS 101",
    location: "6-235",
    instructor: "A GHANNAM",
  },
  {
    id: "3",
    start: new Date("2024-09-24 11:00"), // Tuesday
    end: new Date("2024-09-24 13:00"),
    title: "PE 101",
    location: "11-131",
    instructor: "Instructor Name",
  },
  {
    id: "4",
    start: new Date("2024-09-25 09:00"), // Wednesday
    end: new Date("2024-09-25 10:00"),
    title: "MATH 101",
    location: "6-135",
    instructor: "TAMEM AL-SHORMAN",
  },
  {
    id: "5",
    start: new Date("2024-09-26 10:00"), // Thursday
    end: new Date("2024-09-26 11:00"),
    title: "PHYS 101",
    location: "6-235",
    instructor: "A GHANNAM",
  },
  // Add more events as needed...
];

const Mock: React.FC = () => {
  const [viewMode, setViewMode] = useState<"Today" | "Weekly">("Today");
  const [selectedDate, setSelectedDate] = useState("2024-09-24");
  const dateObject = parseISO(selectedDate);
  const dayNum = format(dateObject, "dd");
  const dayName = dateObject.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const monthYear = format(dateObject, "MMM yyyy");
  const [term, setTerm] = useState("231");
  const [isTermModalVisible, setIsTermModalVisible] = useState(false);
  const terms = ["231", "232", "241"];

  const renderItem = useCallback(
    ({ item }: { item: any }, isWeeklyView: boolean) => {
      return <AgendaItem item={item} isWeeklyView={isWeeklyView} />;
    },
    [],
  );

  const dailyView = (date: string, isWeeklyView: boolean) => {
    // Filter events for the selected date
    const filteredEvents = events.filter((event) => {
      const eventDate = format(event.start, "yyyy-MM-dd");
      return eventDate === date;
    });

    // Map filtered events to the format expected by AgendaList
    const agendaData = [
      {
        title: date,
        data: filteredEvents.map((event) => ({
          id: event.id,
          startTime: format(event.start, "HH:mm"),
          endTime: format(event.end, "HH:mm"),
          title: event.title,
          location: event.location,
          instructor: event.instructor,
        })),
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: isWeeklyView ? 2 : 5,
            fontSize: isWeeklyView ? 10 : 18,
          }}
          numberOfLines={1}
        >
          {format(parseISO(date), "EEE, MMM dd")}
        </Text>
        <AgendaList
          sections={agendaData}
          renderItem={({ item }) => renderItem({ item }, isWeeklyView)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const weeklyView = (date: string) => {
    // Parse the selected date
    const selectedDateObj = parseISO(date);

    // Get the start of the week (Sunday)
    const startOfWeekDate = startOfWeek(selectedDateObj, { weekStartsOn: 0 }); // 0 for Sunday

    // Generate dates from Sunday to Thursday
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = addDays(startOfWeekDate, i);
      const currentDateString = format(currentDate, "yyyy-MM-dd");
      weekDates.push(currentDateString);
    }

    // Render the dailyView for each date
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        {weekDates.map((weekDate) => (
          <View key={weekDate} style={{ flex: 1 }}>
            {dailyView(weekDate, true)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      {/* Header */}
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

      {/* Calendar and Schedule */}
      <CalendarProvider date={selectedDate}>
        <WeekCalendar
          firstDay={0}
          current={selectedDate}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#4561FF" },
          }}
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
          <WeeklyView events={events} selectedDate={selectedDate} />
        ) : (
          <DailyView events={events} selectedDate={selectedDate} />
        )}
      </CalendarProvider>

      {/* Term Selection Modal */}
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
                    className={`text-lg ${
                      term === item ? "font-bold" : "font-normal"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="mt-4 bg-blue-500 py-2 rounded-lg"
              onPress={() => setIsTermModalVisible(false)}
            >
              <Text className="text-center text-white text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Mock;
