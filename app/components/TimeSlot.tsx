import { View } from "react-native";
import CustomText from "./CustomText";
import { TIME_SLOTS } from "@/constants/data";

const TimeSlot = () => (
  <View className="py-4">
    {TIME_SLOTS.map((time) => (
      <CustomText key={time} styles="text-xs font-bold text-center mb-14">
        {time}
      </CustomText>
    ))}
  </View>
);

export default TimeSlot;
