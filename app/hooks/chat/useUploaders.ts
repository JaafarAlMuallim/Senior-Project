import { useDocumentUploader, useImageUploader } from "@/lib/uploadthing";
import { Alert } from "react-native";

export const useUploaders = () => {
  const { openDocumentPicker } = useDocumentUploader("pdf", {
    onClientUploadComplete: () => Alert.alert("Upload Completed"),
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
  });

  const { openImagePicker } = useImageUploader("image", {
    onClientUploadComplete: () => Alert.alert("Upload Completed"),
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
  });

  return {
    openDocumentPicker,
    openImagePicker,
  };
}; 