import CustomText from "@/components/CustomText";
import { cn } from "@/lib/utils";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface TimeSelectorProps {
  availableTimes: Array<{ time: string; date: Date }>;
  selectedTime: string;
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
}

export const TimeSelector = ({ availableTimes, selectedTime, selectedDate, onTimeSelect }: TimeSelectorProps) => {
  const filteredTimes = availableTimes.filter(
    (availableDate) => selectedDate?.toISOString() === availableDate.date.toISOString()
  );

  return (
    <View className="my-8">
      <CustomText styles="text-lg text-black-default mb-2">Available Time</CustomText>
      <FlatList
        className="flex flex-row"
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        data={filteredTimes}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mx-2 my-2"
            onPress={() => onTimeSelect(item.time)}
          >
            <View
              className={cn(
                "border h-12 w-28 rounded-lg justify-center items-center",
                selectedTime === item.time
                  ? "border-primary-light bg-primary-light"
                  : "border-gray-200",
              )}
            >
              <CustomText
                styles={cn(
                  "text-lg font-poppinsBlack",
                  selectedTime === item.time
                    ? "text-white-default"
                    : "text-gray-500",
                )}
              >
                {item.time}
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}; 