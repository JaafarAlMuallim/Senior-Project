import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

interface ChatHeaderProps {
  title: string;
  onBack: () => void;
}

export const ChatHeader = ({ title, onBack }: ChatHeaderProps) => (
  <Stack.Screen
    options={{
      headerShown: true,
      title,
      headerTitleStyle: {
        color: "#4561FF",
        fontSize: 20,
        fontFamily: "PoppinsBold",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
        </TouchableOpacity>
      ),
    }}
  />
); 