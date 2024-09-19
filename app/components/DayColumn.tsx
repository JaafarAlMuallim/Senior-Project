import React from "react";
import { View } from "react-native";
import ClassItem from "./ClassItem";

const DayColumn = ({ item }: { item: any }) => {
  return (
    <View className="flex-1 relative h-[600px]">
      {item.classes.map(
        (classItem: {
          id: string;
          title: string;
          start: string;
          end: string;
          location: string;
        }) => (
          <View key={classItem.id}>
            <ClassItem item={classItem} day={item.day} />
          </View>
        ),
      )}
    </View>
  );
};

export default DayColumn;
