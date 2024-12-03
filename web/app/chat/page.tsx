import ChatBox from "@/components/ChatBox";
import ChatSidebar from "@/components/ChatSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function ChatPage() {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <ChatBox />
      </div>
    </SidebarProvider>
  );
}
