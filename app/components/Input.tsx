import { TextInput, TextInputProps } from "react-native";
import { View } from "react-native";
import CustomText from "./CustomText";
import { ReactNode } from "react";
import React from "react";
import { cn } from "@/lib/utils";

const Input = ({
  label,
  inputConfig,
  children,
  styles,
}: {
  label: string;
  inputConfig: TextInputProps;
  children?: ReactNode;
  styles?: string;
}) => {
  return (
    <View className="flex flex-col h-28">
      <CustomText styles="text-lg text-black-default mb-2">{label}</CustomText>
      <View
        className={`flex h-14 flex-row items-center bg-blue-def50 rounded-xl px-4 border focus:border-primary-light`}
      >
        {children}
        <TextInput
          className={cn(
            `text-lg h-16 px-4 flex-1  font-poppinsItalic active:font-poppins`,
            styles,
          )}
          style={{ textAlignVertical: "center" }}
          {...inputConfig}
        />
      </View>
    </View>
  );
};
export default Input;
