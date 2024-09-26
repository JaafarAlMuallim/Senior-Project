
import React from 'react';
import { View, Text } from 'react-native';
import { Calendar, Camera, House, MessageCircleMore, User, } from "lucide-react-native";

const ButtomBar = () => {

  
  return (
    <View className="basis-1/12 w-screen">
                <View className="flex-1 flex-row">
                    <View className="flex-1 flex-col items-center justify-center basis-1/5 ">
                        <House className="basis-1/2  w-5 h-5" />
                        <Text className="basis-1/3 " >Home</Text>
                    </View>
                    <View className="flex-1 flex-col items-center justify-center basis-1/5 ">
                        <MessageCircleMore className="basis-1/2  w-5 h-5" />
                        <Text className="basis-1/3" >Chat</Text>
                    </View>
                    <View className="flex-1 flex-col items-center justify-center basis-1/5 ">
                        <Camera className="basis-1/2  w-5 h-5" />
                        <Text className="basis-1/3" >Camera</Text>
                    </View>
                    <View className="flex-1 flex-col items-center justify-center basis-1/5 ">
                        <Calendar className="basis-1/2  w-5 h-5" />
                        <Text className="basis-1/3" >Schedule</Text>
                    </View>
                    <View className="flex-1 flex-col items-center justify-center basis-1/5 ">
                        <User className="basis-1/2  w-5 h-5" />
                        <Text className="basis-1/3" >Profile</Text>
                    </View>
                </View>
            </View>
  );
};

export default ButtomBar;

