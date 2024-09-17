// TimeAxis.tsx

import React from "react";
import { View, Text } from "react-native";

interface TimeAxisProps {
  hourHeight: number;
  totalHours: number;
}

const TimeAxis: React.FC<TimeAxisProps> = ({ hourHeight, totalHours }) => {
  const timeLabels = [];
  for (let hour = 7; hour <= 22; hour++) {
    timeLabels.push(`${hour}:00`);
  }

  return (
    <View style={{ width: 50 }}>
      {timeLabels.map((time) => (
        <View
          key={time}
          style={{
            height: hourHeight,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 12, textAlign: "right" }}>{time}</Text>
        </View>
      ))}
    </View>
  );
};

export default TimeAxis;
