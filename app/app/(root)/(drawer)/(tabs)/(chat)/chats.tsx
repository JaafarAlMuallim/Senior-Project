import * as React from "react";
import { Text, View } from "react-native";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chats";
import AiChat from "@/components/AiChat";

const Chats = () => {
  const [value, setValue] = React.useState("AI");

  return (
    <View className="bg-white h-full">
      <View>
        <Root value={value} onValueChange={setValue}>
          <List>
            <View className="flex flex-row justify-between px-20 fixed   mb-3">
              <Trigger value="AI" className="active:">
                <Text
                  className={`font-light text-lg text-gray-500 ${
                    value === "AI" &&
                    "text-blue-600 underline underline-offset-8"
                  }`}
                >
                  AI Assistance
                </Text>
              </Trigger>
              <Trigger value="messages">
                <Text
                  className={`font-light text-lg text-gray-500 ${
                    value === "messages" &&
                    "text-blue-600 underline underline-offset-8"
                  }`}
                >
                  Messages
                </Text>
              </Trigger>
            </View>
          </List>
          <Content value="AI">
            <AiChat
              chatName={"ICS104"}
              recentMessage={"Hi"}
              routeTo={"/chat"}
            />
            <AiChat
              chatName={"ICS104"}
              recentMessage={"Hi"}
              routeTo={"/chat"}
            />
          </Content>
          <Content value="messages">
            <View className="flex flex-column justify-between">
              <Chat
                imageUri={
                  "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                }
                groupName={"Math101"}
                recentMessage={"Hi"}
                time={"10:15"}
                routeTo={"/chat"}
              />
            </View>
          </Content>
        </Root>
      </View>
    </View>
  );
};

export default Chats;
