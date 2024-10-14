import CustomText from "@/components/CustomText";
import { openSettings } from "expo-linking";
import { Redirect, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { CloudUpload } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import { useDocumentUploader, useImageUploader } from "@/lib/uploadthing";
import { useState } from "react";
import { Progress } from "@/components/Progress";
const UploadModalPage = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [progress, setProgress] = useState<number>(0);
  // const { openImagePicker, isUploading } = useImageUploader("img", {
  //   onUploadProgress: (p) => {
  //     setProgress(p);
  //   },
  //   onClientUploadComplete: () =>
  //     Alert.alert(
  //       "Upload Complete",
  //       "Your file has been uploaded successfully.",
  //     ),
  //   onUploadError: (error) => Alert.alert("Upload Error", error.message),
  // });
  // const { mutate: addFiles } = trpc.courses.addFiles.useMutation({
  //   onSuccess: () => Alert.alert("Reached Backend"),
  //   onError: (error) => Alert.alert("Error", error.message),
  // });
  console.log(id);
  const pickFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      const files = res.assets?.map((file) => file.file!);
      console.log(res.assets ? res.assets[0] : "No files");
      if (res.canceled) {
        Alert.alert("Upload Cancelled");
      } else {
        Alert.alert(
          "Upload Complete",
          "Your file has been uploaded successfully.",
        );
      }

      // addFiles({
      //   courseId: id!,
      //   files: files!,
      // });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while picking files.");
    }
  };

  if (!id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }

  // if (isUploading) {
  //   return (
  //     <View className="h-full bg-white-default justify-center items-center">
  //       <CustomText styles="text-primary-light text-2xl font-bold">
  //         Uploading Files
  //       </CustomText>
  //       <Progress value={progress} />
  //     </View>
  //   );
  // }

  return (
    <View className="h-full bg-white-default justify-center items-center">
      <TouchableOpacity
        // onPress={() => {
        // openDocumentPicker({
        //   onCancel: () => Alert.alert("Upload Cancelled"),
        // });
        // openImagePicker({
        //   onInsufficientPermissions: () => {
        //     Alert.alert(
        //       "No Permissions",
        //       "You need to grant permission to your Photos to use this",
        //       [
        //         { text: "Dismiss" },
        //         { text: "Open Settings", onPress: openSettings },
        //       ],
        //     );
        //   },
        //   onCancel: () => Alert.alert("Upload Cancelled"),
        // });
        // }}
        onPress={pickFiles}
        className="flex flex-col justify-center items-center"
      >
        <CloudUpload size={56} color={"#4561FF"} />
        <CustomText styles="text-primary-light text-2xl font-bold">
          Upload Files{" "}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default UploadModalPage;
