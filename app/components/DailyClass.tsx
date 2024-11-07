import React from "react";
import CustomText from "./CustomText";
import { View } from "react-native";
import { calculateDuration, isClassCurrent, cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

const DailyClass = ({ item, day }: { item: any; day: string }) => {
  const duration = calculateDuration(item.start, item.end);
  const height = duration * 3;
  const isCurrentClass = isClassCurrent(day, item.start, item.end);

  return (
    <View
      className={`flex-row justify-center p-3 mb-4 rounded-lg shadow`}
      style={{ height: height }}
    >
      <View className="w-16">
        <CustomText styles="text-primary-black text-sm">
          {item.start}
        </CustomText>
        <CustomText styles="text-gray-medium text-sm">{item.end}</CustomText>
      </View>
      <View
        className={`flex-1 ml-4 rounded-2xl p-4 shadow ${isCurrentClass ? "bg-primary-light" : "bg-white-light"}`}
        style={{ height: height }}
      >
        <CustomText
          styles={cn(
            `font-bold text-lg`,
            isCurrentClass ? "text-primary-white" : "text-primary-black",
          )}
        >
          {item.title}
        </CustomText>
        <CustomText
          styles={cn(
            `text-sm font-semibold $`,
            isCurrentClass ? "text-primary-white" : "text-primary-black",
          )}
        >
          {item.section}
        </CustomText>
        <View className="flex-row items-center pt-3">
          <Ionicons
            name="location-outline"
            size={12}
            color={isCurrentClass ? "white" : "gray"}
          />
          <CustomText
            styles={cn(
              `text-sm ml-2 font-light`,
              isCurrentClass ? "text-primary-white" : "text-primary-black",
            )}
          >
            {item.location}
          </CustomText>
        </View>
        <View className="flex-row items-center mt-2">
          <Ionicons
            name="person-outline"
            size={12}
            color={isCurrentClass ? "white" : "gray"}
          />
          <CustomText
            styles={cn(
              `text-sm ml-2 font-light`,
              isCurrentClass ? "text-primary-white" : "text-primary-black",
            )}
          >
            {item.instructor}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DailyClass;
