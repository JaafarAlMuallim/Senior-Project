import React from 'react';
import { View, Text } from 'react-native';
import { ChevronRight, UserRound } from "lucide-react-native";

const ProfileOption = ({
  label,

}:{
  label: string,

}) => {

  
  return (
    <View className="basis-3/12 flex-row items-center" >
      <View className="flex-none">
        <UserRound className="w-10 h-10 mx-2" />
      </View>
      <Text className="flex-initial font-poppinsSemiBold text-lg w-64 ml-2">
        {label}
      </Text>
      <View className="flex-initial">
        <ChevronRight className="w-10 h-10" />
      </View>
    </View>
  );
};

export default ProfileOption;
