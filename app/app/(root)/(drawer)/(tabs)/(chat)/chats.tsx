import { useEffect, useState } from "react";
import { View } from "react-native";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chat";
import AiChat from "@/components/AiChat";
import CustomText from "@/components/CustomText";
import { cn, separateNameNum } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { Link } from "expo-router";
import { useOfflineStore } from "@/store/offlineStorage";

const Chats = () => {
  const [value, setValue] = useState("AI");
  const { groups: storageGroups, setGroups } = useOfflineStore();

  const { data: groups } = trpc.groups.getUserGroups.useQuery(undefined, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (groups) {
      setGroups(groups);
    }
  }, [groups]);

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
              {!storageGroups ||
                (!storageGroups.length && (
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
                ))}
              {storageGroups &&
                storageGroups
                  .filter((group) => group.type === "AI")
                  .map((group) => (
                    <AiChat
                      groupId={group.groupId}
                      chatName={separateNameNum(group.name)}
                      key={group.id}
                      routeTo={`/ai/${group.groupId}?name=${group.name}`}
                    />
                  ))}
            </Content>
            <Content value="messages">
              <View className="flex flex-column justify-between">
                {!storageGroups ||
                  (!storageGroups.length && (
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
                  ))}
                {storageGroups &&
                  storageGroups
                    .filter((group) => group.type === "GROUP")
                    .map((group) => (
                      <Chat
                        imageUri={
                          "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                        }
                        key={group.id}
                        groupId={group.groupId}
                        groupName={separateNameNum(group.name)}
                        routeTo={`/${group.groupId}?name=${group.name}`}
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
