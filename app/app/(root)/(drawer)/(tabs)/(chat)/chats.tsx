import { useState } from "react";
import { View, Text } from "react-native";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chat";
import AiChat from "@/components/AiChat";
import CustomText from "@/components/CustomText";
import { cn, separateNameNum } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useUserStore } from "@/store/store";
import { Link } from "expo-router";

const Chats = () => {
  const [value, setValue] = useState("AI");

  const { user } = useUserStore();
  const { data: groups, isLoading } = trpc.groups.getUserGroups.useQuery({
    userId: user.user.id,
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

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
                        `font-light text-lg text-gray-500`,
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
                        `font-light text-lg text-gray-500`,
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
              {!groups && (
                <View className="flex h-full grow items-center py-24 flex-wrap px-8">
                  <CustomText styles="text-2xl text-wrap text-center">
                    Register Your{" "}
                    <Link
                      href={"/(root)/(drawer)/(tabs)/(schedule)/schedule"}
                      className="underline text-primary-light font-bold"
                    >
                      Schedule
                    </Link>{" "}
                    To Be Added To AI Assistants
                  </CustomText>
                </View>
              )}
              {groups &&
                groups.map((group) => (
                  <AiChat
                    chatName={separateNameNum(group.group.name)}
                    key={group.group.id}
                    routeTo={`/chat/${group.id}`}
                    recentMessage={"Hi"}
                  />
                ))}
            </Content>
            <Content value="messages">
              <View className="flex flex-column justify-between">
                {!groups && (
                  <View className="flex h-full grow items-center py-24 flex-wrap px-8">
                    <CustomText styles="text-2xl text-wrap text-center">
                      Register Your{" "}
                      <Link
                        href={"/(root)/(drawer)/(tabs)/(schedule)/schedule"}
                        className="underline text-primary-light font-bold"
                      >
                        Schedule
                      </Link>{" "}
                      To Be Added To Groups
                    </CustomText>
                  </View>
                )}
                {groups &&
                  groups.map((group) => (
                    <Chat
                      imageUri={
                        "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                      }
                      key={group.group.id}
                      groupName={separateNameNum(group.group.name)}
                      recentMessage={"Hi"}
                      time={"10:15"}
                      routeTo={`/chat/${group.group.id}`}
                    />
                  ))}
              </View>
            </Content>
          </Root>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chats;
