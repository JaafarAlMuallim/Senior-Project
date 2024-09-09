// CourseCard.tsx
import React from "react";
import { View, Text } from "react-native";

type CourseCardProps = {
  course: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  duration: number;
  topPosition: number;
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  startTime,
  endTime,
  location,
  instructor,
  duration,
  topPosition,
}) => {
  return (
    <View
      className="absolute left-0 right-0 p-2 bg-gray-200 rounded-md border border-gray-300 overflow-hidden"
      style={{
        height: duration, // Adjusted scaling to ensure duration matches visual representation
        top: topPosition, // Correctly aligns the card based on the calculated position
        marginVertical: 2, // Add margin to avoid overlap
      }}
    >
      <Text className="font-normal" numberOfLines={1} ellipsizeMode="tail">
        {course}
      </Text>
      <Text
        className="text-sm text-gray-600"
        numberOfLines={1}
        ellipsizeMode="tail"
      >{`${startTime} - ${endTime}`}</Text>
      <Text
        className="text-sm text-gray-600"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {location}
      </Text>
      <Text
        className="text-sm text-gray-600"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {instructor}
      </Text>
    </View>
  );
};

export default CourseCard;
