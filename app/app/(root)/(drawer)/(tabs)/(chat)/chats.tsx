import { useState } from "react";
import { View } from "react-native";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chat";
import AiChat from "@/components/AiChat";
import CustomText from "@/components/CustomText";
import { cn } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";

const Chats = () => {
  const [value, setValue] = useState("AI");

  return (
    <SafeAreaView>
      <View className="bg-white h-full">
        <View>
          <Root value={value} onValueChange={setValue}>
            <List>
              <View className="flex flex-row justify-between px-14 py-4">
                <Trigger value="AI" className="active:">
                  <View
                    className={cn(
                      value === "AI" && "border-b-2 border-primary-light",
                    )}
                  >
                    <CustomText
                      styles={cn(
                        `font-light text-xl text-gray-500`,
                        value === "AI" && "text-primary-light",
                      )}
                    >
                      AI Assistance
                    </CustomText>
                  </View>
                </Trigger>
                <Trigger value="messages">
                  <View
                    className={cn(
                      value === "messages" && "border-b-2 border-primary-light",
                    )}
                  >
                    <CustomText
                      styles={cn(
                        `font-light text-xl text-gray-500`,
                        value === "messages" && "text-primary-light",
                      )}
                    >
                      Messages
                    </CustomText>
                  </View>
                </Trigger>
              </View>
            </List>
            <Content value="AI">
              <AiChat
                chatName={"ICS104"}
                recentMessage={"Hi"}
                routeTo={"/104"}
              />
              <AiChat
                chatName={"ICS104"}
                recentMessage={"Hi"}
                routeTo={"/1042"}
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
                  routeTo={"/101"}
                />
                <Chat
                  imageUri={
                    "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  }
                  groupName={"Math101"}
                  recentMessage={"Hi"}
                  time={"10:15"}
                  routeTo={"/2"}
                />
                <Chat
                  imageUri={
                    "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  }
                  groupName={"Math101"}
                  recentMessage={"Hi"}
                  time={"10:15"}
                  routeTo={"/cha3"}
                />
                <Chat
                  imageUri={
                    "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  }
                  groupName={"Math101"}
                  recentMessage={"Hi"}
                  time={"10:15"}
                  routeTo={"/3hat"}
                />
                <Chat
                  imageUri={
                    "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  }
                  groupName={"Math101"}
                  recentMessage={"Hi"}
                  time={"10:15"}
                  routeTo={"/2"}
                />
              </View>
            </Content>
          </Root>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chats;
