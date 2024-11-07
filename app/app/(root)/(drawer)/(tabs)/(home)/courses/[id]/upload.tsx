import CustomText from "@/components/CustomText";
import * as FileSystem from "expo-file-system";
import { Redirect, useLocalSearchParams } from "expo-router";
import { CloudUpload } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Progress } from "@/components/Progress";
import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";
import { decode } from "punycode";

const UploadModalPage = () => {
  const { id, type } = useLocalSearchParams<{ id?: string; type?: string }>();
  const [progress, setProgress] = useState<number>(0);
  const { mutate: addMaterial } = trpc.courses.addMaterial.useMutation({});
  const pickFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });
    const assets = file.assets;
    if (!assets) {
      return;
    }
    const currFile = assets[0];
    const filePath = `${currFile.name}`;
    const mimeType = currFile.mimeType!;
    console.log(currFile, filePath, mimeType);
    try {
      const data = await supabase.storage
        .from("files")
        .upload(filePath, currFile.uri, { contentType: mimeType });
      addMaterial({
        courseId: id!,
        file: {
          url: data.data?.fullPath!,
          type: mimeType,
          size: currFile.size! || 0.5,
          name: currFile.name!,
        },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to upload file");
    }
  };
  if (!id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }

  return (
    <View className="h-full bg-white-default justify-center items-center">
      <TouchableOpacity
        onPress={pickFile}
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
