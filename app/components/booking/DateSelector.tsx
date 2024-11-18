import CustomText from "@/components/CustomText";
import { cn } from "@/lib/utils";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface DateSelectorProps {
  dates: Array<{ date: Date }>;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DateSelector = ({ dates, selectedDate, onDateSelect }: DateSelectorProps) => {
  return (
    <View>
      <CustomText styles="text-lg text-black-default mb-2">Select Date</CustomText>
      <FlatList
        className="flex flex-row"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dates}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mx-2"
            onPress={() => onDateSelect(item.date)}
          >
            <View
              className={cn(
                "border h-28 w-20 rounded-lg",
                selectedDate?.toISOString() === item.date.toISOString()
                  ? "bg-primary-light border-primary-light"
                  : "bg-white border-gray-200",
              )}
            >
              <View className="h-full flex flex-col justify-between items-center py-4">
                <CustomText
                  styles={cn(
                    "text-lg flex font-poppinsBlack text-3xl pt-4",
                    selectedDate?.toISOString() === item.date.toISOString()
                      ? "text-white-default"
                      : "text-gray-500",
                  )}
                >
                  {item.date.toDateString().slice(8, 10)}
                </CustomText>
                <CustomText
                  styles={cn(
                    "font-poppinsBlack text-lg",
                    selectedDate?.toISOString() === item.date.toISOString()
                      ? "text-white-default"
                      : "text-gray-500",
                  )}
                >
                  {item.date.toDateString().slice(0, 3)}
                </CustomText>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}; 