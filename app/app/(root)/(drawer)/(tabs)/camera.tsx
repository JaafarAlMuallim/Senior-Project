import { toast } from "@/components/ui/toast";
import { separateNameNum } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current?.takePictureAsync(options);
      // Save to Supabase Under Others and Let User Select Course
      console.log(data?.uri, "<<<<<<<<<<<<<<<<<<<<<");
      toast({
        title: "Success",
        description: "Picture taken successfully",
        actions: [
          {
            text: "Save",
            onPress: () => {
              // Saving to Supabase
            },
            className:
              "bg-green-800 p-2 rounded-md justify-center items-center my-2",
            textClassName: "text-white-default text-center text-xl",
          },
        ],
        ms: 7000,
        variant: "success",
      });
    } catch (error) {
      console.log(error, "ERROR <<<<<<<<<<<<<");
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    requestPermission();
  }
  const name = "Camera";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          title: separateNameNum(name?.toString() || "Select Course"),
          headerStyle: {
            backgroundColor: "transparent", // Black with 80% opacity
          },
          headerTitleStyle: {
            color: "black", // #4561FF
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 justify-center">
        <CameraView
          className="flex-1 justify-end items-center"
          facing={"back"}
          ref={cameraRef}
          onCameraReady={() => {
            console.log("Camera ready");
          }}
        >
          <View className="bg-black-80 w-full justify-center items-center rounded-t-2xl opacity-90">
            <TouchableOpacity onPress={takePicture}>
              <View className="my-8 h-20 w-20 rounded-full bg-white-default"></View>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </>
  );
}
