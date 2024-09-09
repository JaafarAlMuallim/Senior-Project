// DateNavigation.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const DateNavigation: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // Calculate the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const handleDatePress = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <View className="h-14">
      {/* Container with fixed height to control layout */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }} // Align items to center vertically
        className="flex-shrink-0" // Prevent the ScrollView from stretching unnecessarily
      >
        {days.map((date, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center px-3 py-1 rounded-md ${
              selectedDate === date.getDate() ? "bg-primary-default" : ""
            }`}
            onPress={() => handleDatePress(date.getDate())}
          >
            {/* Ensure all strings are rendered within <Text> components */}
            <Text
              className={
                selectedDate === date.getDate() ? "text-white" : "text-gray"
              }
            >
              {date.toLocaleDateString("en-US", { weekday: "short" })}{" "}
              {/* Day name */}
            </Text>
            <Text
              className={
                selectedDate === date.getDate() ? "text-white" : "text-gray"
              }
            >
              {date.getDate()} {/* Day number */}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DateNavigation;
