import { useEffect, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chat";
import AiChat from "@/components/AiChat";
import CustomText from "@/components/CustomText";
import { cn, separateNameNum } from "@/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useUserStore } from "@/store/store";
import { Link, Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Loader2 } from "lucide-react-native";

const Chats = () => {
  const [value, setValue] = useState("AI");

  const { user } = useUserStore();

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  console.log(user.user.id);
  const { data: groups, isLoading } = trpc.groups.getUserGroups.useQuery(
    {
      userId: user.user.id,
    },
    {
      gcTime: 1000,
    },
  );

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedIn>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
            className="flex-1 items-center justify-center"
          >
            <Loader2 className="h-48 w-48" size={96} />
          </Animated.View>
        </SignedIn>
        <SignedOut>
          <Redirect href={"/(auth)/welcome"} />
        </SignedOut>
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
              {!groups ||
                (!groups.length && (
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
              {groups &&
                groups.map((group) => (
                  <AiChat
                    chatName={separateNameNum(group.name)}
                    key={group.id}
                    routeTo={`/${group.id}?name=${group.name}`}
                    recentMessage={"Hi"}
                  />
                ))}
            </Content>
            <Content value="messages">
              <View className="flex flex-column justify-between">
                {!groups ||
                  (!groups.length && (
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
                {groups &&
                  groups.map((group) => (
                    <Chat
                      imageUri={
                        "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                      }
                      key={group.id}
                      groupId={group.id}
                      groupName={separateNameNum(group.name)}
                      time={"10:15"}
                      routeTo={`/${group.id}?name=${group.name}`}
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
