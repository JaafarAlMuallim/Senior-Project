import { TextInput, TextInputProps } from "react-native";
import { View } from "react-native";
import CustomText from "./CustomText";
import { ReactNode } from "react";

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
      <View className="flex h-14 flex-row items-center bg-blue-def50 rounded-xl px-4">
        {children}
        <TextInput
          className={`text-lg h-14 px-4 flex-1 font-poppinsItalic active:font-poppins ${styles}`}
          {...inputConfig}
        />
      </View>
    </View>
  );
};
export default Input;
