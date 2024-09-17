// EventItem.tsx

import React from "react";
import { View, Text } from "react-native";
import { EventData } from "./types";

interface EventItemProps {
  event: EventData;
  isWeeklyView: boolean;
  hourHeight: number;
  totalHours: number;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  isWeeklyView,
  hourHeight,
  totalHours,
}) => {
  if (isWeeklyView) {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const eventDuration = endHour - startHour;

    // Calculate top position and height based on time
    const top = (startHour - 7) * hourHeight;
    const height = eventDuration * hourHeight;

    // Set a minimum height to ensure all text is visible
    const minHeight = 90; // Increased minimum height to provide more space
    const eventHeight = Math.max(height, minHeight);

    return (
      <View
        style={{
          position: "absolute",
          top: top,
          left: 5,
          right: 5,
          height: eventHeight,
          backgroundColor: "#4561FF",
          borderRadius: 5,
          padding: 4,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 12,
            lineHeight: 14,
          }}
          numberOfLines={2} // Allow the title to wrap onto two lines
          ellipsizeMode="tail"
        >
          {event.title}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 11,
            lineHeight: 13,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {event.location}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 11,
            lineHeight: 13,
          }}
          numberOfLines={2} // Allow the instructor name to wrap onto two lines
          ellipsizeMode="tail"
        >
          {event.instructor}
        </Text>
      </View>
    );
  } else {
    // For daily view
    return null;
  }
};

export default EventItem;
