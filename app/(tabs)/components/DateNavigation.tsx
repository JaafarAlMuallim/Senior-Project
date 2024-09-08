// DateNavigation.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const DateNavigation: React.FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const handleDatePress = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dateContainer}
      contentContainerStyle={styles.contentContainer} // Added to manage inner content
    >
      {days.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateItem,
            selectedDate === date.getDate() && styles.selectedDateItem,
          ]}
          onPress={() => handleDatePress(date.getDate())}
        >
          <Text
            style={
              selectedDate === date.getDate()
                ? styles.selectedDayText
                : styles.dayText
            }
          >
            {date.toLocaleDateString("en-US", { weekday: "short" })}
          </Text>
          <Text
            style={
              selectedDate === date.getDate()
                ? styles.selectedDateText
                : styles.dateText
            }
          >
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    paddingHorizontal: 16,
    height: 60, // Fixed height to prevent stretching
    flexGrow: 0, // Prevents it from stretching to fill space
    flexShrink: 1, // Allows it to shrink appropriately
    flexDirection: "row", // Ensures proper layout direction
  },
  contentContainer: {
    alignItems: "center", // Center align items within the container
    height: 60, // Keep consistent height to match content
  },
  dateItem: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
  selectedDateItem: {
    backgroundColor: "#4a90e2",
    borderRadius: 10,
  },
  dayText: {
    fontSize: 14,
    color: "#888",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedDayText: {
    fontSize: 14,
    color: "#fff",
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DateNavigation;
