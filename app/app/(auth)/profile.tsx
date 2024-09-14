import {
  Moon,
  UserRound,
  ShieldCheck,
  Bell,
  CircleHelp,
  UsersRound,
} from "lucide-react-native";
import { Text, View, Image } from "react-native";
import ProfileOption from "@/components/ProfileOption";
import React from "react";
import CustomText from "@/components/CustomText";
import { images } from "@/constants/images";

const Profile = () => {
  return (
    <View className="flex-1 flex-col bg-white-default w-full">
      <View className="w-full">
        <View className="w-full rounded-b-[80px] bg-primary-light bg-opacity-70 h-[230px]" />
        <View className="absolute top-32 left-24 w-56 h-56 rounded-full bg-primary-dark">
          <Image
            className="w-56 h-56 rounded-full border-red"
            source={images.profileImage}
            resizeMode={"cover"}
          />
        </View>
        <Moon className="w-10 h-10 self-end px-8 mt-4" size={32} />
        <View className="flex flex-col justify-center items-center mt-20">
          <CustomText styles="font-poppinsSemiBold text-2xl">
            Mohammed
          </CustomText>
          <CustomText styles="text-lg">Mohammed123@kfupm.edu.sa</CustomText>
        </View>
      </View>
      <View className="w-full flex flex-col px-8">
        <CustomText styles="text-xl text-gray-400 mt-2">
          Account Setting
        </CustomText>
        <View className="flex-col flex">
          <ProfileOption
            label={"Edit Profile"}
            icon={<UserRound size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Security"}
            icon={<ShieldCheck size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Notification"}
            icon={<Bell color={"black"} />}
          />
        </View>
      </View>
      <View className="border border-black w-full my-4 opacity-20" />
      <View className="w-full flex flex-col px-8">
        <Text className="font-poppins text-xl text-gray-400 mt-2">More</Text>
        <View className="flex-col flex">
          <ProfileOption
            label={"Help & Support"}
            icon={<CircleHelp size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Contact Us"}
            icon={<UsersRound size={32} color={"black"} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
