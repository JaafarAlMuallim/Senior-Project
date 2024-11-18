import { toast } from '@/components/ui/toast';
import { useUploadThing } from '@/lib/uploadthing';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const { startUpload } = useUploadThing("audio", {
    onUploadBegin: () => {
      toast({
        title: "Uploading",
        description: "Audio is being uploaded",
        variant: "info",
        ms: 3000,
      });
    },
    onClientUploadComplete: () => {
      toast({
        title: "Success",
        description: "Audio uploaded successfully",
        variant: "success",
        ms: 3000,
      });
    },
    onUploadError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
        ms: 3000,
      });
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (save: boolean) => {
    if (!recording) return;

    setIsRecording(false);

    try {
      await recording.stopAndUnloadAsync();
      if (save) {
        const uri = recording.getURI();
        if (uri) {
          const response = await fetch(uri);
          if (!response.ok) {
            console.error("Failed to fetch recording");
            return;
          }
          const blob = await response.blob();
          const file = new File([blob], "audio.mp3", { type: "audio/mp3" });
          startUpload([file]);
          setRecordingDuration(0);
        }
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }

    setRecording(null);
  };

  return {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
  };
}; 