import { ReactNode } from "react";
import { Text } from "react-native";

const CustomText = ({
  children,
  styles: className,
}: {
  children: ReactNode;
  styles: string;
}) => {
  return <Text className={`font-poppins ${className}`}>{children}</Text>;
};
export default CustomText;
