import { Suspense } from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import ChatSidebarContent from "./ChatSidebarContent";
import { trpc } from "@/trpc/server";

const ChatSidebar = async () => {
  const chats = await trpc.groups.getUserGroups();
  const aiChats = chats?.filter((chat) => chat.group.type === "AI");
  const regularChats = chats.filter((chat) => chat.group.type !== "AI");

  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <Suspense fallback={<div>Loading chats...</div>}>
          <ChatSidebarContent aiChats={aiChats} regularChats={regularChats} />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
export default ChatSidebar;
