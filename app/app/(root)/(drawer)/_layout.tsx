import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
        backBehavior="history"
      >
        <Drawer.Screen
          name="(tutoring)/tutoring"
          options={{
            title: "Tutoring",
            headerShown: true,
            headerTitleStyle: {
              color: "#4561FF", // #4561FF
              fontSize: 20,
              fontFamily: "PoppinsBold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} className="mx-4">
                <Ionicons name="chevron-back" size={24} color={"#4561FF"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="(booking)/booking"
          options={{
            title: "Booking",
            headerShown: true,
            headerTitleStyle: {
              color: "#4561FF", // #4561FF
              fontSize: 20,
              fontFamily: "PoppinsBold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} className="mx-8">
                <Ionicons name="close" size={24} color={"#4561FF"} />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
