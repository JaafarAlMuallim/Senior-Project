// HeaderTabs.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type HeaderTabsProps = {
  viewMode: "daily" | "weekly";
  setViewMode: (mode: "daily" | "weekly") => void;
};

const HeaderTabs: React.FC<HeaderTabsProps> = ({ viewMode, setViewMode }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setViewMode("daily")}>
        <Text
          style={[styles.headerText, viewMode === "daily" && styles.activeText]}
        >
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMode("weekly")}>
        <Text
          style={[
            styles.headerText,
            viewMode === "weekly" && styles.activeText,
          ]}
        >
          Weekly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    color: "#888",
  },
  activeText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default HeaderTabs;
