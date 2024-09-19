import { Drawer } from "expo-router/drawer";
import { ChevronLeft, X } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import CustomText from "@/components/CustomText";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
        backBehavior="history"
      >
        <Drawer.Screen
          name="tutoring"
          options={{
            title: "Tutoring",
            headerShown: true,
            header: () => (
              <SafeAreaView className="px-4">
                <View className="flex flex-row items-center">
                  <View className="w-1/6">
                    <TouchableOpacity
                      className=""
                      onPress={() => {
                        console.log("Back button pressed");
                        router.back();
                      }}
                    >
                      <ChevronLeft size={32} color={"#4561FF"} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 items-center">
                    <CustomText styles="text-2xl text-primary-light">
                      Tutoring
                    </CustomText>
                  </View>
                  <View className="w-1/6"></View>
                </View>
              </SafeAreaView>
            ),
          }}
        />
        <Drawer.Screen
          name="booking"
          options={{
            title: "Booking",
            headerShown: true,
            header: () => (
              <SafeAreaView className="px-4">
                <View className="flex flex-row items-center">
                  <View className="w-1/6">
                    <TouchableOpacity
                      className="ml-4"
                      onPress={() => {
                        console.log("Back button pressed");
                        router.back();
                      }}
                    >
                      <X size={32} color={"#4561FF"} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 items-center">
                    <CustomText styles="text-2xl text-primary-light">
                      New Session
                    </CustomText>
                  </View>
                  <View className="w-1/6"></View>
                </View>
              </SafeAreaView>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
