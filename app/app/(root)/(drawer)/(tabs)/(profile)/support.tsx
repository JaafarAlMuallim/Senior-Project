import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { useTailwind } from "tailwind-rn";
import { Message } from "@/types/message";
import MessageBox from "@/components/MessageBox";

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const tailwind = useTailwind();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const sendMessage = () => {
    if (inputText.trim().length > 0) {
      const newMessage: Message = {
        id: `${messages.length + 1}`,
        text: inputText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fromUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      setTimeout(() => {
        const supportMessage: Message = {
          id: `${messages.length + 2}`,
          text: "Thank you for reaching out to us. Support staff will get back to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          fromUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, supportMessage]);
      }, 1000);
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (result && !result.canceled && result.assets) {
        result.assets.forEach((asset) => {
          const newMessage: Message = {
            id: `${messages.length + 1}`,
            text: asset.mimeType?.startsWith("image")
              ? undefined
              : `File: ${asset.name}`,
            file: asset.uri,
            fileType: asset.mimeType?.split("/")[0],
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            fromUser: true,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      }
    } catch (err) {
      console.log("File picking error:", err);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      await newRecording.startAsync();

      setRecording(newRecording); // Save the recording object
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        const newMessage: Message = {
          id: `${messages.length + 1}`,
          audio: uri,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          fromUser: true,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Reset the recording state
        setRecording(null);
      } catch (err) {
        console.error("Failed to stop recording:", err);
      }
    }
  };

  return (
    <View className="flex-1 p-4 bg-primary-white">
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBox item={item} />} // Correctly pass item to MessageBox
        keyExtractor={(item) => item.id}
        className="flex-1 bg-primary-white"
        contentContainerStyle={tailwind("flex-col-reverse")}
      />
      <View className="flex-row items-center p-2">
        <TouchableOpacity onPress={handleFilePicker}>
          <Ionicons name="attach" size={24} color="#3044FF" />
        </TouchableOpacity>

        {/* Press-and-hold mic button */}
        <TouchableOpacity
          onPressIn={startRecording} // Start recording when pressed
          onPressOut={stopRecording} // Stop recording when released
        >
          <Ionicons name="mic" size={24} color="#3044FF" className="mx-2" />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message"
          className="flex-1 bg-gray-200 rounded-lg px-4 py-2 mx-2"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#3044FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Support;
