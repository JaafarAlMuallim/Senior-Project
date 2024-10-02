import { View } from "react-native";
import CustomText from "./CustomText";
import DailyClass from "./DailyClass";

type Class = {
  id: string;
  title: string;
  section: string;
  start: string;
  end: string;
  location: string;
  instructor: string;
};

const DayMapper = {
  Sunday: "SUN",
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WEN",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
};
const DaySchedule = ({
  dayName,
  selectedDate,
  strucutredEvents,
}: {
  dayName: string;
  selectedDate: string;
  strucutredEvents: { day: string; classes: Class[] }[];
}) => {
  const daySchedule = strucutredEvents.find(
    (event) => event.day === DayMapper[dayName as keyof typeof DayMapper],
  );
  console.log(daySchedule);
  if (daySchedule && daySchedule.classes.length > 0) {
    return (
      <View className="py-4">
        {daySchedule.classes.map((classItem) => (
          <DailyClass key={classItem.id} item={classItem} day={selectedDate} />
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
