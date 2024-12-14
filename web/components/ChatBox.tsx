"use client";

import { useSearchParams } from "next/navigation";
import { MessageSquare } from "lucide-react";
import Chat from "@/components/Chat";
import AIChat from "./AIChat";

const ChatBox = () => {
  const searchParams = useSearchParams();
  const selectedChat = searchParams.get("chat");
  const selectedType = searchParams.get("type");

  return (
    <>
      {!!selectedChat ? (
        selectedType === "AI" ? (
          <AIChat groupId={selectedChat} />
        ) : (
          <Chat groupId={selectedChat} />
        )
      ) : (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto text-primary-light mb-4" />
            <h2 className="text-2xl font-semibold text-primary-light mb-2">
              No Chat Selected
            </h2>
            <p className="text-primary-light opacity-75">
              Choose a chat from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
