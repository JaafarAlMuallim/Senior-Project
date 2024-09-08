// WeeklySchedule.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WeeklySchedule: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>
        Weekly Schedule View (To be implemented)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});

export default WeeklySchedule;
