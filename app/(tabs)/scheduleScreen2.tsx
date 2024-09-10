// ScheduleScreen.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";
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

const ScheduleScreen2 = () => {
  return (
    <View className="flex-1 bg-white">
      <CalendarProvider className="flex-1 bg-white" date="2024-09-10">
        <WeekCalendar className="flex-1 bg-white" />
      </CalendarProvider>
    </View>
  );
};

export default ScheduleScreen2;
