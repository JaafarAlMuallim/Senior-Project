import { Suspense, useEffect, useState } from "react";
import { View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Root, List, Trigger, Content } from "@rn-primitives/tabs";
import Chat from "@/components/Chat";
import AiChat from "@/components/AiChat";
import CustomText from "@/components/CustomText";
import { toast } from "@/components/ui/toast";
import { cn, separateNameNum } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { Group, useOfflineStore } from "@/store/offlineStorage";
import MuteAction from "@/components/MuteAction";

type ChatType = "AI" | "GROUP";

const NoGroupsMessage = () => (
  <View className="flex h-full grow items-center py-24 flex-wrap px-8">
    <CustomText styles="text-2xl text-wrap text-center">
      Register Your{" "}
      <Link
        href="/(root)/(drawer)/(tabs)/(schedule)/schedule"
        className="underline text-primary-light font-bold"
      >
        Schedule
      </Link>{" "}
      To Be Added To Groups
    </CustomText>
  </View>
);

const LoadingMessage = () => (
  <View className="flex h-full grow items-center py-24">
    <CustomText styles="text-xl">Loading...</CustomText>
  </View>
);

const ChatItem = ({
  group,
  type,
  onMute,
}: {
  group: Group;
  type: ChatType;
  onMute?: (groupId: string, currentStatus: boolean) => void;
}) => {
  const content =
    type === "AI" ? (
      <AiChat
        key={group.id}
        groupId={group.group.groupId}
        chatName={separateNameNum(group.group?.name || "")}
        routeTo={`/ai/${group.group.groupId}?name=${encodeURIComponent(group.group?.name || "")}`}
      />
    ) : (
      <Swipeable
        key={group.id}
        renderRightActions={(progress, dragX) => (
          <MuteAction
            progressAnimatedValue={progress}
            dragAnimatedValue={dragX}
            isMuted={group.isMuted}
            onMute={() => onMute?.(group.id, group.isMuted)}
          />
        )}
      >
        <Chat
          imageUri="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
          groupId={group.group.groupId}
          groupName={separateNameNum(group.group?.name || "")}
          routeTo={`/${group.group.groupId}?name=${encodeURIComponent(group.group?.name || "")}`}
          isMuted={group.isMuted}
        />
      </Swipeable>
    );

  return content;
};

export default function Chats() {
  const [value, setValue] = useState("AI");
  const { groups: offlineGroups, setGroups } = useOfflineStore();
  const utils = trpc.useUtils();
  const netInfo = useNetInfo();

  const { data: onlineGroups, isLoading } = trpc.groups.getUserGroups.useQuery(
    undefined,
    {
      refetchInterval: 5000,
      enabled: !!netInfo.isConnected,
    },
  );

  const { mutate: changeMuteStatus } = trpc.groups.changeMute.useMutation({
    onMutate: async ({ groupId, status }) => {
      await utils.groups.getUserGroups.cancel();
      const previousGroups = utils.groups.getUserGroups.getData();

      const updateGroups = (groups?: Group[]) =>
        groups?.map((group) =>
          group.id === groupId ? { ...group, isMuted: status } : group,
        );

      utils.groups.getUserGroups.setData(undefined, (old) =>
        old?.map((group) =>
          group.id === groupId ? { ...group, isMuted: status } : group,
        ),
      );

      const updatedOfflineGroups = updateGroups(offlineGroups);
      if (updatedOfflineGroups) {
        setGroups(updatedOfflineGroups);
      }

      return { previousGroups };
    },
    onError: (_, __, context) => {
      utils.groups.getUserGroups.setData(undefined, context?.previousGroups);
      if (context?.previousGroups) {
        setGroups(context.previousGroups);
      }

      toast({
        title: "Error",
        description: "Failed to update mute status. Please try again.",
        ms: 3000,
        variant: "error",
      });
    },
    onSettled: () => {
      utils.groups.getUserGroups.invalidate();
    },
    onSuccess: (_, variables) => {
      const groups = onlineGroups || offlineGroups;
      const groupName =
        groups?.find((g) => g.id === variables.groupId)?.group.name || "Group";

      toast({
        title: variables.status ? "Muted Group" : "Unmuted Group",
        description: `You have ${variables.status ? "muted" : "unmuted"} ${groupName}`,
        ms: 3000,
        variant: "info",
      });
    },
  });

  useEffect(() => {
    if (onlineGroups) {
      setGroups(onlineGroups);
    }
  }, [onlineGroups, setGroups]);

  const handleMuteAction = (groupId: string, currentStatus: boolean) => {
    if (netInfo.isConnected) {
      changeMuteStatus({ groupId, status: !currentStatus });
    } else {
      const updatedGroups = offlineGroups?.map((group) =>
        group.id === groupId ? { ...group, isMuted: !currentStatus } : group,
      );
      if (updatedGroups) {
        setGroups(updatedGroups);
      }
    }
  };

  const renderContent = (type: ChatType) => {
    console.log("IS LOADING: ", isLoading);
    return (
      <View>
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <View>
            {(netInfo.isConnected ? onlineGroups : offlineGroups)
              ?.filter((group) => group.group.type === type)
              .map((group) => (
                <ChatItem
                  key={group.id}
                  group={group}
                  type={type}
                  onMute={handleMuteAction}
                />
              )) || <NoGroupsMessage />}
          </View>
        )}
      </View>
    );
  };

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
            <Content value="AI">{renderContent("AI")}</Content>
            <Content value="messages">{renderContent("GROUP")}</Content>
          </Root>
        </View>
      </View>
    </SafeAreaView>
  );
}
