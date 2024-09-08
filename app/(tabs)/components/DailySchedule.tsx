// DailySchedule.tsx
import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import CourseCard from "./CourseCard";

const dailyData = [
  {
    id: "1",
    course: "MATH 101",
    startTime: "10:00",
    endTime: "10:50",
    duration: 50,
    location: "5-135",
    instructor: "TAMEM AL-SHORMAN",
  },
  {
    id: "2",
    course: "PHYS 101",
    startTime: "11:00",
    endTime: "13:40",
    duration: 160,
    location: "6-236",
    instructor: "A GHANNAM",
  },
];

const timeSlots = Array.from(
  { length: 16 },
  (_, i) => `${8 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
);

const getTopPosition = (startTime: string) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  return (hours - 8) * 60 + minutes; // Converts time to position based on a start of 8:00 AM
};

const DailySchedule: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.scheduleContainer}>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <Text key={index} style={styles.timeSlot}>
              {slot}
            </Text>
          ))}
        </View>
        <View style={styles.courseContainer}>
          {dailyData.map((item) => (
            <CourseCard
              key={item.id}
              course={item.course}
              startTime={item.startTime}
              endTime={item.endTime}
              location={item.location}
              instructor={item.instructor}
              duration={item.duration}
              topPosition={getTopPosition(item.startTime)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  contentContainer: {
    paddingHorizontal: 0, // Removed padding to align with schedule
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeSlotsContainer: {
    width: 60,
    alignItems: "flex-end",
    marginRight: 5,
  },
  timeSlot: {
    fontSize: 12,
    height: 60, // Consistent height for 30-minute intervals
    color: "#888",
  },
  courseContainer: {
    flex: 1,
    position: "relative",
  },
});

export default DailySchedule;
