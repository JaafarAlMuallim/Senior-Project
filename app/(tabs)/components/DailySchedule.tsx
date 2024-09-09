// DailySchedule.tsx
import React from "react";
import { View, ScrollView, Text } from "react-native";
import CourseCard from "./CourseCard";

const dailyData = [
  {
    id: "1",
    course: "MATH 101",
    startTime: "10:00",
    endTime: "10:50",
    duration: (50 / 60) * 128,
    location: "5-135",
    instructor: "TAMEM AL-SHORMAN",
  },
  {
    id: "2",
    course: "PHYS 101",
    startTime: "11:00",
    endTime: "13:40",
    duration: (160 / 60) * 128,
    location: "6-236",
    instructor: "A GHANNAM",
  },
];

// Create time slots starting from 7 AM to 10 PM for better alignment
const timeSlots = Array.from(
  { length: 28 },
  (_, i) => `${7 + Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
);

const getTopPosition = (startTime: string) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  // Ensure that each hour translates correctly relative to 7:00 AM as base
  return (hours - 7 + minutes / 60) * 128; // Starting from 7:00 AM = -7,,,,,, 1hour = 128PX
};

const DailySchedule: React.FC = () => {
  return (
    <ScrollView className="flex-1">
      <View className="flex-row items-start">
        <View className="w-16 items-end mr-2">
          {timeSlots.map((slot, index) => (
            <Text key={index} className="text-xs h-16 text-gray">
              {" "}
              {/* Increase slot height for proper scaling */}
              {slot}
            </Text>
          ))}
        </View>
        <View className="flex-1 relative">
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

export default DailySchedule;
