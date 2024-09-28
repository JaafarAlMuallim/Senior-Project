import { Message } from '@/types/message';
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Audio } from "expo-av";

const playAudio = async (uri: string) => {
    const sound = new Audio.Sound();
    try {
        await sound.loadAsync({ uri });
        await sound.playAsync();
    } catch (error) {
        console.error("Error playing audio", error);
    }
};

const MessageBox = ({ item }: { item: Message }) => (
    <View
        className={`flex flex-row ${item.fromUser ? "justify-end" : "justify-start"} mb-4`}
    >
        <View
            className={`rounded-lg px-4 py-2 max-w-3/4 ${item.fromUser ? "bg-chat-default" : "bg-chat-notification"}`}
        >
            {item.file && item.fileType === "image" && (
                <Image
                    source={{ uri: item.file }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                    className="mb-2"
                />
            )}
            {item.file && item.fileType !== "image" && (
                <Text className="text-primary-white">{item.text}</Text>
            )}
            {item.audio && (
                <TouchableOpacity onPress={() => playAudio(item.audio)}>
                    <Text className="text-primary-white">Voice Message</Text>
                </TouchableOpacity>
            )}
            {!item.file && !item.audio && (
                <Text className="text-primary-white">{item.text}</Text>
            )}
            <Text className="text-primary-white text-xs mt-1 text-right">
                {item.time}
            </Text>
        </View>
    </View>
);

export default MessageBox;