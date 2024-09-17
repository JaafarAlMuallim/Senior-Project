// WeeklyView.tsx

import React from "react";
import { View, Text } from "react-native";
import TimeAxis from "./TimeAxis";
import EventItem from "./EventItem";
import { EventData } from "./types";
import { format, parseISO, startOfWeek, addDays } from "date-fns";

interface WeeklyViewProps {
  events: EventData[];
  selectedDate: string;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ events, selectedDate }) => {
  // Generate week dates (Sunday to Thursday)
  const weekDates = [];
  const startDate = parseISO(selectedDate);
  const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 0 });
  for (let i = 0; i < 5; i++) {
    const date = format(addDays(startOfWeekDate, i), "yyyy-MM-dd");
    weekDates.push(date);
  }

  const totalHours = 15; // From 7 AM to 10 PM
  const hourHeight = 80; // Adjust this value to make gaps bigger or smaller
  const containerHeight = totalHours * hourHeight;

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {/* Time Axis */}
      <TimeAxis hourHeight={hourHeight} totalHours={totalHours} />

      {/* Events for each day */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        {weekDates.map((date) => {
          const dayEvents = events.filter(
            (event) => format(event.start, "yyyy-MM-dd") === date,
          );

          return (
            <View key={date} style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                {format(parseISO(date), "EEE, MMM dd")}
              </Text>
              <View style={{ position: "relative", height: containerHeight }}>
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    isWeeklyView={true}
                    hourHeight={hourHeight}
                    totalHours={totalHours}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WeeklyView;
