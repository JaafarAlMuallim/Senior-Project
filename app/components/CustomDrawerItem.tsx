import { cn } from "@/lib/utils";
import { usePathname } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import CustomText from "./CustomText";
const CustomDrawerItem = ({
  Icon,
  name,
  description,
}: {
  Icon: LucideIcon;
  name: string;
  description: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname.toLowerCase().includes(name.toLowerCase());

  return (
    <View
      className={cn(
        "p-4 rounded-lg",
        isActive ? "bg-primary-light/20" : "bg-transparent",
      )}
    >
      <View className="flex flex-row flex-1 items-center">
        <Icon color={isActive ? "black" : "#4561FF"} size={40} />
        <View className="flex flex-col ml-4">
          <CustomText
            styles={cn(
              "text-xl text-primary-light",
              isActive ? "text-black" : "text-primary-light",
            )}
          >
            {name}
          </CustomText>
          <CustomText
            styles={cn(
              "text-black-40 text-md text-wrap pr-8",
              isActive ? "text-black" : "text-black-40",
            )}
          >
            {description}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerItem;
