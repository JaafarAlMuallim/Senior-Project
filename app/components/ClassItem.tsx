import { View } from "react-native";
import CustomText from "./CustomText";
import { calculatePositionAndHeight, cn } from "@/lib/utils";
import { format } from "date-fns";

const ClassItem = ({ item, day }: { item: any; day: string }) => {
  const currentDay = format(new Date(), "EEEE");
  const isCurrentDay = day === currentDay;
  const { top, height } = calculatePositionAndHeight(item.start, item.end);
  return (
    <View
      className={`absolute left-0 right-0 py-1 rounded-lg shadow-lg ${isCurrentDay ? "bg-primary-light" : "bg-white-light"}`}
      style={{ top, height }}
    >
      <CustomText
        styles={cn(
          `text-center tracking-tighter font-bold text-xs`,
          isCurrentDay ? "text-primary-white" : "text-primary-black",
        )}
      >
        {item.title}
      </CustomText>
      <CustomText
        styles={cn(
          `text-xs p-1`,
          isCurrentDay ? "text-primary-white" : "text-primary-black",
        )}
      >
        {item.location}
      </CustomText>
    </View>
  );
};

export default ClassItem;
