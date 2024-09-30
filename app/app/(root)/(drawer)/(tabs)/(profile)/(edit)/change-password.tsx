import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { LockKeyhole } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const ChangePassword = () => {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <View className="h-64 w-full px-4 flex-1 bg-white-default shadow-slage-900 py-8 justify-center z-50">
      <View className="justify-center">
        <Input
          label={"Current Password"}
          inputConfig={{
            placeholder: "**********",
            secureTextEntry: true,
            value: prevPassword,
            onChangeText: setPrevPassword,
            textContentType: "password",
          }}
        >
          <LockKeyhole />
        </Input>
        <Input
          label={"New Password"}
          inputConfig={{
            placeholder: "**********",
            secureTextEntry: true,
            value: newPassword,
            onChangeText: setNewPassword,
            textContentType: "password",
          }}
        >
          <LockKeyhole />
        </Input>
      </View>
      <TouchableOpacity
        className="items-center justify-center min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
        onPress={() => {}}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default ChangePassword;
