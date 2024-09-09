// ScheduleHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ScheduleHeaderProps = {
  viewMode: "daily" | "weekly";
  setViewMode: (mode: "daily" | "weekly") => void;
};

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  viewMode,
  setViewMode,
}) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-2 bg-white-default">
      <View className="flex-row items-center">
        <Text className="text-lg font-normal text-primary-default mr-2">
          231
        </Text>
        <TouchableOpacity className="flex-row items-center px-2 py-1 bg-schedule-term rounded-md">
          <Text className="mr-1 text-primary-black">Select Term</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center">
        <Text className="text-lg font-normal text-primary-black mr-2">
          Sun, Sep 8
        </Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === "daily" ? "weekly" : "daily")}
          className="px-2 py-1 bg-schedule-term rounded-md"
        >
          <Text className="text-primary-black">
            {viewMode === "daily" ? "Daily" : "Weekly"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-primary-default p-2 rounded-full">
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleHeader;
