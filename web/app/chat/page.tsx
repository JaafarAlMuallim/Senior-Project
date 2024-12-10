import ChatBox from "@/components/ChatBox";
import ChatSidebarContent from "@/components/ChatSidebarContent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import Navabar from "@/components/Navbar";
import { trpc } from "@/trpc/server";

const ChatPage = async () => {
  const chats = await trpc.groups.getUserGroups();
  const aiChats = chats?.filter((chat) => chat.group.type === "AI");
  const regularChats = chats.filter((chat) => chat.group.type !== "AI");
  return (
    <>
      <Navabar />
      <SidebarProvider>
        <Sidebar className="mt-16">
          <SidebarContent>
            <ChatSidebarContent aiChats={aiChats} regularChats={regularChats} />
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <ChatBox />
        </div>
      </SidebarProvider>
    </>
  );
};
export default ChatPage;
