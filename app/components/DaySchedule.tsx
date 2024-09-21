import { View } from "react-native";
import CustomText from "./CustomText";
import DailyClass from "./DailyClass";
import { EVENTS } from "@/constants/data";

const DaySchedule = ({
  dayName,
  selectedDate,
}: {
  dayName: string;
  selectedDate: string;
}) => {
  const daySchedule = EVENTS.find((event) => event.day === dayName);
  if (daySchedule) {
    return (
      <View className="py-4">
        {daySchedule.classes.map((classItem) => (
          <DailyClass item={classItem} day={selectedDate} />
        ))}
      </View>
    );
  }
  return (
    <View className="flex-1 justify-center items-center py-8">
      <CustomText styles="flex-1 justify-center text-2xl">
        No classes on {dayName}
      </CustomText>
    </View>
  );
};

export default DaySchedule;
