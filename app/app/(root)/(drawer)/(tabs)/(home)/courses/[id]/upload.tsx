import CustomText from "@/components/CustomText";
import * as DocumentPicker from "expo-document-picker";
import { Redirect, useLocalSearchParams } from "expo-router";
import { CloudUpload } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";
const UploadModalPage = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const pickFiles = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while picking files.");
    }
  };

  if (!id) {
    return <Redirect href="/(root)/(drawer)/(tabs)/(home)/home" />;
  }
  return (
    <View className="h-full bg-white-default justify-center items-center">
      <TouchableOpacity
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
