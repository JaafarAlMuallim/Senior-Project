"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import ChatCard from "./ChatCard";
import { ChatGroup } from "@/models/chatGroups";
import { separateNameNum, updateMultipleSearchParams } from "@/lib/utils";
import AIChatCard from "./AIChatCard";

const ChatSidebarContent = ({
  aiChats,
  regularChats,
}: {
  aiChats: ChatGroup[];
  regularChats: ChatGroup[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedChat = searchParams.get("chat") || "";
  const pathname = usePathname();

  const handleChatClick = (
    groupId: string,
    type: string,
    agent: string | null,
  ) => {
    updateMultipleSearchParams(
      ["chat", "type", "agent"],
      [groupId, type, agent],
      searchParams.toString(),
      pathname,
      router,
    );
  };

  return (
    <>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              AI
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent className="list-none flex flex-col gap-2">
              {aiChats.map((chat) => (
                <SidebarMenuItem
                  key={chat.group.groupId}
                  onClick={() =>
                    handleChatClick(
                      chat.group.groupId,
                      "AI",
                      separateNameNum(chat.group.name).toUpperCase(),
                    )
                  }
                >
                  <AIChatCard chat={chat} selectedChat={selectedChat} />
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Regular
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent className="list-none flex flex-col gap-2">
              {regularChats.map((chat) => (
                <SidebarMenuItem
                  key={chat.group.groupId}
                  onClick={() =>
                    handleChatClick(chat.group.groupId, "Regular", null)
                  }
                >
                  <ChatCard chat={chat} selectedChat={selectedChat} />
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  );
};

export default ChatSidebarContent;
