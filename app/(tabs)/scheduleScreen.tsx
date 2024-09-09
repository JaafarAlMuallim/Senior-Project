// ScheduleScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScheduleHeader from "./components/ScheduleHeader";
import DailySchedule from "./components/DailySchedule";
import WeeklySchedule from "./components/WeeklySchedule";
import DateNavigation from "./components/DateNavigation";

const ScheduleScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  return (
    <View className="flex-1 bg-white">
      <ScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
      <DateNavigation />
      {viewMode === "daily" ? <DailySchedule /> : <WeeklySchedule />}
    </View>
  );
};

export default ScheduleScreen;
