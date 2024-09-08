// CourseCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
      style={[
        styles.courseCard,
        { height: (duration / 60) * 60, top: topPosition },
      ]}
    >
      <Text style={styles.courseTitle}>{course}</Text>
      <Text style={styles.courseInfo}>{`${startTime} - ${endTime}`}</Text>
      <Text style={styles.courseInfo}>{location}</Text>
      <Text style={styles.courseInfo} numberOfLines={1} ellipsizeMode="tail">
        {instructor}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden", // Ensures text does not overflow
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseInfo: {
    fontSize: 14,
    color: "#555",
  },
});

export default CourseCard;
