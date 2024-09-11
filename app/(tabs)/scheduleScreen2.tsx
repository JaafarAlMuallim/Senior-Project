// ScheduleScreen.tsx
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { styled } from "nativewind"; // Use nativewind for Tailwind CSS in React Native
import {
  Agenda,
  AgendaList,
  WeekCalendar,
  CalendarList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["fr"] = {
  monthNames: [
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

// Define agenda items
const agendaItems = [
  {
    title: "2024-09-10",
    data: [
      {
        id: "1",
        name: "MATH 101",
        startTime: "10:00",
        endTime: "10:50",
        location: "5-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "3",
        name: "MATH 102",
        startTime: "11:00",
        endTime: "11:50",
        location: "5-135",
        instructor: "TAMEM AL-SHORMAN",
      },
    ],
  },
  {
    title: "2024-09-11",
    data: [
      {
        id: "2",
        name: "PHYS 101",
        startTime: "11:00",
        endTime: "13:40",
        location: "6-236",
        instructor: "A GHANNAM",
      },
    ],
  },
];

// Styled components using nativewind
const ItemContainer = styled(
  SafeAreaView,
  "bg-white p-4 my-2 rounded-xl shadow-md flex-row",
);
const HiddenSection = styled(SafeAreaView, "h-0 overflow-hidden");

// Component to render each item in the agenda list
const AgendaItem = ({ item }: { item: any }) => (
  <ItemContainer>
    <Text className="w-20 text-gray-500 text-sm">{`${item.startTime} - ${item.endTime}`}</Text>
    <SafeAreaView className="flex-1 ml-2">
      <Text className="font-poppinsBold text-primary-dark text-lg">
        {item.name}
      </Text>
      <Text className="text-secondary-gray">{item.location}</Text>
      <Text className="text-secondary-gray">{item.instructor}</Text>
    </SafeAreaView>
  </ItemContainer>
);

const ScheduleScreen2 = () => {
  const [selectedDate, setSelectedDate] = useState("2024-09-10");

  // Update marked dates to ensure only the selected date is active
  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: "#4561FF" },
  };

  // Filter agenda items to only show those for the selected date
  const filteredAgendaItems = agendaItems.filter(
    (section: any) => section.title === selectedDate,
  );

  // Callback to render agenda items
  const renderItem = useCallback(({ item }: { item: any }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <CalendarProvider date={selectedDate} showTodayButton>
        <ExpandableCalendar
          firstDay={0} // Week starts on Sunday
          current={selectedDate}
          markedDates={markedDates} // Ensure only the selected date is marked
          onDayPress={(day) => setSelectedDate(day.dateString)} // Update selected date
          theme={{
            todayTextColor: "red",
            dayTextColor: "black",
            textDisabledColor: "gray",
            selectedDayBackgroundColor: "#4561FF",
            selectedDayTextColor: "white",
            monthTextColor: "black",
            textSectionTitleColor: "gray",
          }}
          disableWeekScroll
        />
        <AgendaList
          sections={filteredAgendaItems} // Show only items for the selected date
          renderItem={renderItem}
        />
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default ScheduleScreen2;
