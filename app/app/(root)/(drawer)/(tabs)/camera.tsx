import CustomText from "@/components/CustomText";
import { Progress } from "@/components/Progress";
import { toast } from "@/components/ui/toast";
import { trpc } from "@/lib/trpc";
import { useImageUploader } from "@/lib/uploadthing";
import { separateNameNum } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ClientUploadedFileData } from "uploadthing/types";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filename, setFilename] = useState<string | null>(null);
  const { mutate: addMaterial } = trpc.courses.addMaterial.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Material added successfully",
        variant: "success",
        ms: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        ms: 3000,
      });
    },
  });

  const { openImagePicker, isUploading } = useImageUploader("image", {
    onUploadBegin: (filename) => {
      setFilename(filename);
      setUploadProgress(0);
      toast({
        title: "Uploading",
        description: "Image is being uploaded",
        variant: "info",
        ms: 3000,
      });
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
      console.log("Progress", progress);
    },
    onClientUploadComplete: (
      data: ClientUploadedFileData<{ url: string }>[],
    ) => {
      addMaterial({
        file: {
          type: "image",
          size: 0,
          category: "IMG",
          name: filename ?? "No name",
          url: data[0].url,
        },
      });
      toast({
        title: "Success",
        description: "Image uploaded successfully",
        variant: "success",
        ms: 3000,
      });

      setFilename(null);
      setUploadProgress(0);
    },
    onUploadError: (error) => {
      console.log(error.toJSON(), "ERROR <<<<<<<<<<<<<");
      setFilename(null);
      setUploadProgress(0);
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        ms: 3000,
      });
    },
  });

  useEffect(() => {
    openImagePicker({ source: "camera" });
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            color: "black",
            fontSize: 20,
            fontFamily: "PoppinsBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="px-4">
              <Ionicons name="chevron-back" size={24} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 justify-center bg-white-default">
        <View className="px-4 py-6">
          <View className="mb-4">
            <Progress value={uploadProgress} className="h-2" />
          </View>
          {isUploading && (
            <View className="flex flex-row justify-between">
              <CustomText styles="text-sm text-gray-600">
                {filename || "No file selected"}
              </CustomText>
              <CustomText styles="text-sm text-gray-600">
                {uploadProgress}%
              </CustomText>
            </View>
          )}
          <TouchableOpacity
            className="mt-6 bg-primary p-4 rounded-lg items-center"
            onPress={() => openImagePicker({ source: "camera" })}
          >
            <CustomText styles="text-white font-medium text-2xl">
              Take Photo
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
