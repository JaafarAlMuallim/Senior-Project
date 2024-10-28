import { useUser, useClerk } from "@clerk/clerk-expo";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import { Book, CalendarPlus, Info, LogOut } from "lucide-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { Redirect, useRouter } from "expo-router";
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <Redirect href={"/(auth)/welcome"} />
      </View>
    );
  }

  return (
    <DrawerContentScrollView style={{ paddingHorizontal: 8 }} {...props}>
      <TouchableOpacity
        className="mb-8"
        onPress={() => {
          router.push("/(root)/(drawer)/(tabs)/(profile)/profile");
        }}
      >
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
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Navigating to /tutoring");
          router.push("/(root)/(drawer)/(tutoring)/tutoring");
        }}
      >
        <CustomDrawerItem
          Icon={Book}
          name={"Tutoring"}
          description={"Apply to be a tutor and help other students"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/(root)/(drawer)/(booking)/booking");
        }}
      >
        <CustomDrawerItem
          Icon={CalendarPlus}
          name={"Book Session"}
          description={"Book a tutoring session with a tutor"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/(root)/(drawer)/(tabs)/(profile)/profile");
        }}
      >
        <CustomDrawerItem
          Icon={Info}
          name={"About"}
          description={"Learn more about our platform"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          signOut({ redirectUrl: "/" });
        }}
        className="my-20 p-4 justify-self-end"
      >
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
