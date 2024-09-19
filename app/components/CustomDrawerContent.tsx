import { useUser } from "@clerk/clerk-expo";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import {
  Book,
  Calendar,
  CalendarPlus,
  Info,
  LogOut,
  MessagesSquare,
} from "lucide-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { Link } from "expo-router";
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  // TODO: Change links to actual links
  return (
    <DrawerContentScrollView style={{ paddingHorizontal: 8 }} {...props}>
      <Link replace href={"/(root)/(drawer)/(tabs)/home"} className="mb-8">
        <View className="flex flex-row flex-1 px-8 justify-center items-center">
          <Image
            source={{ uri: user?.imageUrl }}
            className="h-10 w-10 rounded-full"
          />
          <View className="flex flex-col ml-4">
            <CustomText styles="text-lg text-primary-light">
              {user?.fullName}
            </CustomText>
            <CustomText styles="text-black-40 text-md">
              {user?.emailAddresses[0].emailAddress}
            </CustomText>
          </View>
        </View>
      </Link>

      <CustomDrawerItem
        Icon={Book}
        name={"Tutoring"}
        description={"Apply to be a tutor and help other students"}
        link={"/tutoring"}
      />
      <CustomDrawerItem
        Icon={MessagesSquare}
        name={"Chat"}
        description={"Chat with our AI, or with other students"}
        link={"/homer"}
      />

      <CustomDrawerItem
        Icon={Calendar}
        name={"Calendar"}
        description={"View your schedule and upcoming events"}
        link={"/homez"}
      />

      <CustomDrawerItem
        Icon={CalendarPlus}
        name={"Book Session"}
        description={"Book a tutoring session with a tutor"}
        link={"/booking"}
      />

      <CustomDrawerItem
        Icon={Info}
        name={"About"}
        description={"Learn more about our platform"}
        link={"/homex"}
      />

      <TouchableOpacity onPress={() => {}} className="my-20 p-4">
        <View className="flex flex-row flex-1 items-center">
          <LogOut size={40} color={"#C21D1A"} />
          <View className="flex flex-col ml-4">
            <CustomText styles="text-danger-default font-poppinsBold text-xl">
              Log Out
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
