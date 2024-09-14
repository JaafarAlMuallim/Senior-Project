import { Moon } from "lucide-react-native";
import {  View } from "react-native";
import React from "react";
import { Text, Image } from "react-native";
import { images } from "@/constants/images";
import ProfileOption from "@/components/ProfileOption";
import ButtomBar from "@/components/ButtomBar";

const Profile = () => {


  return (
    <View className="flex-1 flex-col items-center justify-center bg-white-default">
            <View className="basis-5/12 flex-col " >
                <View className="basis-8/12 w-screen rounded-b-3xl bg-blue-600 bg-opacity-70 items-center justify-center">
                    <View className="mt-64 h-10">
                        <Image source={images.profile} className="w-24 h-24 mt-6" />
                    </View>
                    <Moon  className= "w-10 h-10 mx-2 ml-72 -mt-2"/>
                    <Text className="font-poppinsSemiBold text-lg mt-24">Mohammed</Text>
                    <Text className="font-poppins">Mohammed123@kfupm.edu.sa</Text>
                </View>
            </View>
            <View className="basis-3/12 w-screen ml-10  w-full" >
                <Text className="font-poppins text-lg text-gray-400 mt-2">Account Setting</Text>
                <View className="flex-1 flex-col -mt-2">
                    <ProfileOption label={"Edit Profile"} /> 
                    <ProfileOption label={"Security"} />
                    <ProfileOption label={"Notification"} />
                </View>
            </View>
            <View className="h-px w-11/12 bg-gray-300"/>
            <View className="basis-3/12 w-screen ml-10" >
                <Text className="font-poppins text-lg text-gray-400 mt-2">More</Text>
                <View className="flex-1 flex-col -mt-2">
                    <ProfileOption label={"Help & Support"} /> 
                    <ProfileOption label={"Contact Ss"} />
                    <ProfileOption label={"Notification"} />
                </View>
            </View>
            <ButtomBar/>
    </View>
  );
};

export default Profile;
