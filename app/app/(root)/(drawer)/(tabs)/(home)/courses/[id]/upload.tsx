import CustomText from "@/components/CustomText";
import { Progress } from "@/components/Progress";
import { toast } from "@/components/ui/toast";
import { trpc } from "@/lib/trpc";
import { useDocumentUploader } from "@/lib/uploadthing";
import { Redirect, useLocalSearchParams } from "expo-router";
import { CloudUpload } from "lucide-react-native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

const UploadModalPage = () => {
  const { id, type } = useLocalSearchParams<{ id?: string; type?: string }>();
  const [progress, setProgress] = useState<number>(0);
  const { openDocumentPicker, isUploading } = useDocumentUploader("pdf", {
    onClientUploadComplete: () => Alert.alert("Upload Completed"),
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
    onUploadProgress: (progress) => setProgress(progress),
  });
  const { mutate: addMaterial } = trpc.courses.addMaterial.useMutation({});
  if (!id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }

  return (
    <View className="h-full bg-white-default justify-center items-center">
      <TouchableOpacity
        onPress={() =>
          openDocumentPicker({
            onCancel: () =>
              toast({
                title: "Upload Cancelled",
                variant: "info",
                description: "You cancelled the upload",
                ms: 3000,
              }),
          })
        }
        className="flex flex-col justify-center items-center"
      >
        <CloudUpload size={56} color={"#4561FF"} />
        <Progress value={progress} />
        <CustomText styles="text-primary-light text-2xl font-bold">
          Upload Files{" "}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default UploadModalPage;
