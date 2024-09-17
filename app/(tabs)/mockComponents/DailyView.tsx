// DailyView.tsx

import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { AgendaList } from "react-native-calendars";
import { styled } from "nativewind";
import { EventData } from "./types";
import { format } from "date-fns";

interface DailyViewProps {
  events: EventData[];
  selectedDate: string;
}

const ItemContainer = styled(
  View,
  "bg-white p-4 my-2 rounded-xl flex-row items-center",
);

const AgendaItem = ({ item }: { item: any }) => (
  <ItemContainer>
    <Text
      style={{ width: 80, color: "#888", fontSize: 12 }}
    >{`${item.startTime} - ${item.endTime}`}</Text>
    <View style={{ backgroundColor: "#4561FF", flex: 1, marginLeft: 8, borderRadius: 5, }}>
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        {item.title}
      </Text>
      <Text style={{ color: "#fff", fontSize: 14 }}>{item.location}</Text>
      <Text style={{ color: "#fff", fontSize: 14 }}>{item.instructor}</Text>
    </View>
  </ItemContainer>
);

const DailyView: React.FC<DailyViewProps> = ({ events, selectedDate }) => {
  // Filter events for the selected date
  const filteredEvents = events.filter(
    (event) => format(event.start, "yyyy-MM-dd") === selectedDate,
  );

  // Map events to the format expected by AgendaList
  const agendaData = [
    {
      title: selectedDate,
      data: filteredEvents.map((event) => ({
        id: event.id,
        startTime: format(event.start, "HH:mm"),
        endTime: format(event.end, "HH:mm"),
        title: event.title,
        location: event.location,
        instructor: event.instructor,
      })),
    },
  ];

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <AgendaList
      sections={agendaData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default DailyView;
