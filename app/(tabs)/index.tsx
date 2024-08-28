import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-primary-default text-3xl font-poppins">
          Poppins
        </Text>
        <Text className="text-primary-default text-3xl font-poppinsBold">
          Poppins Bold
        </Text>
        <Text className="text-primary-default text-3xl font-poppinsItalic">
          Poppins Italic
        </Text>
        <Text className="text-primary-default text-3xl font-poppinsRegular">
          Poppins Regular
        </Text>
        <Text className="text-primary-default text-3xl font-poppinsSemiBold">
          Poppins SemiBold
        </Text>
        <Text className="text-fill-default text-3xl font-bold">
          fill color for buttons
        </Text>
        <Text className="text-fill-default text-3xl font-PoppinsMediumItalic">
          XXXX
        </Text>
        <Text className="text-primary-default text-3xl font-Poppins">
          app main font
        </Text>
        <Text className="text-fill-default text-3xl font-bold">
          app main color for filling
        </Text>
        <Text className="text-fill-default text-3xl font-bold">
          app main chat fill color
        </Text>
        <Text className="text-chat-replies text-3xl font-bold">
          app replies chat fill color
        </Text>
        <Text className="text-chat-notification text-3xl font-bold">
          app notification chat fill color
        </Text>
        <Text className="text-schedule-term text-3xl font-bold">
          app main color for term and day background color
        </Text>
      </View>
    </SafeAreaView>
  );
}
