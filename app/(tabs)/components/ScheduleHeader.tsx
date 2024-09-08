// ScheduleHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure @expo/vector-icons is installed

type ScheduleHeaderProps = {
  viewMode: "daily" | "weekly";
  setViewMode: (mode: "daily" | "weekly") => void;
};

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  viewMode,
  setViewMode,
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.termLabel}>231</Text>
        <TouchableOpacity style={styles.termButton}>
          <Text style={styles.termButtonText}>Select Term</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === "daily" ? "weekly" : "daily")}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {viewMode === "daily" ? "Daily" : "Weekly"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  termLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
  termButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  termButtonText: {
    marginRight: 5,
    color: "#000",
  },
  middleSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  toggleButton: {
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  toggleButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#4a90e2",
    padding: 8,
    borderRadius: 50,
  },
});

export default ScheduleHeader;
