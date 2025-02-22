import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Text } from "react-native";
import React from "react";

const CustomText = ({
  children,
  styles: className,
}: {
  children: ReactNode;
  styles?: string;
}) => {
  return <Text className={cn(`font-poppins`, className)}>{children}</Text>;
};
export default CustomText;
