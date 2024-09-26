import { Link, usePathname } from "expo-router";
import { View } from "react-native";
import CustomText from "./CustomText";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react-native";
const CustomDrawerItem = ({
  Icon,
  name,
  description,
  link,
}: {
  Icon: LucideIcon;
  name: string;
  description: string;
  link: string;
}) => {
  const pathname = usePathname();
  return (
    <View
      className={cn(
        "p-4 rounded-lg",
        pathname === link ? "bg-primary-light/20" : "bg-transparent",
      )}
    >
      <Link push href={link}>
        <View className="flex flex-row flex-1 items-center">
          {<Icon color={pathname === link ? "black" : "#4561FF"} size={40} />}
          <View className="flex flex-col ml-4">
            <CustomText
              styles={cn(
                "text-xl text-primary-light",
                pathname === link ? "text-black" : "text-primary-light",
              )}
            >
              {name}
            </CustomText>
            <CustomText
              styles={cn(
                "text-black-40 text-md text-wrap pr-8",
                pathname === link ? "text-black" : "text-black-40",
              )}
            >
              {description}
            </CustomText>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default CustomDrawerItem;
