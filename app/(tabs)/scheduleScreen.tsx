// ScheduleScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScheduleHeader from "./components/ScheduleHeader";
import HeaderTabs from "./components/HeaderTabs";
import DailySchedule from "./components/DailySchedule";
import WeeklySchedule from "./components/WeeklySchedule";
import DateNavigation from "./components/DateNavigation";

const ScheduleScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  return (
    <View style={styles.container}>
      <ScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
      <DateNavigation />
      {viewMode === "daily" ? <DailySchedule /> : <WeeklySchedule />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

export default ScheduleScreen;
