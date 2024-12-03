"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Image as ImageIcon,
  Mic,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/app-sidebar";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const selectChat = (chat: string) => {
    setSelectedChat(chat);
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        aiChat={["MATH 101", "ICS 104"]}
        regularChats={["MATH 102", "ICS 108"]}
        onClick={selectChat}
        selectedChat={selectedChat ?? ""}
      />
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="bg-white border-b p-4">
              <h2 className="text-xl font-semibold">{selectedChat}</h2>
            </div>
            <ScrollArea className="p-4 h-3/4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                    Hello! How can I help you with {selectedChat}?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-[70%]">
                    I'm having trouble understanding the key concepts. Can you
                    explain them?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                    Let's start with the fundamental principles of{" "}
                    {selectedChat}. What specific areas are you struggling with?
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="border-t p-4 bg-white">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Paperclip size={20} />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ImageIcon size={20} />
                  <span className="sr-only">Attach image</span>
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border-0 focus:ring-0 focus:outline-0 bg-transparent focus:border-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Mic size={20} />
                  <span className="sr-only">Record audio</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Send size={20} />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Chat Selected
              </h2>
              <p className="text-gray-500">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};
export default ChatPage;
