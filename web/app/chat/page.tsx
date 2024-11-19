"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BellOff,
  Image as ImageIcon,
  Mic,
  MessageSquare,
  Paperclip,
  Search,
  Send,
} from "lucide-react";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-96 bg-primary-light flex flex-col px-4">
        <div className="w-full flex items-center gap-2 border-secondary-lightGray shadow-black bg-white rounded-md my-4 px-4">
          <Search />
          <Input
            type="text"
            className="border-0 ring-0 outline-none focus:ring-0 focus:border-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search Chat"
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4">
            {["MATH 101", "ICS 474", "ICS 344"].map((chat) => (
              <Card
                key={chat}
                className={`bg-white hover:bg-secondary-lightGray cursor-pointer transition-colors ${selectedChat === chat ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://github.com/shadcn.png`} />
                    <AvatarFallback className="bg-violet-700 text-white">
                      JA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{chat}</h4>
                    <p className="text-sm text-gray-500">Last message...</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <p className="text-xs text-gray-500">14:07</p>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-500 text-white">2</Badge>
                      <BellOff size={16} className="text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="bg-white border-b p-4">
              <h2 className="text-xl font-semibold">{selectedChat}</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
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
                  className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent"
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
    </div>
  );
};
export default ChatPage;

// <Card className="bg-white hover:bg-secondary-lightGray group">
//   <CardContent className="w-full py-2 flex flex-row justify-between items-center">
//     <div className="flex gap-4 items-center my-0 w-full">
//       <Avatar>
//         <AvatarImage src="https://github.com/shadcn.png" />
//         <AvatarFallback className="bg-violet-700 text-white">JA</AvatarFallback>
//       </Avatar>
//       <div className="text-md grow flex flex-col justify-center itemsc-center">
//         <h4 className="text-lg">MATH 101</h4>
//         <p className="text-muted-foreground">Loading...</p>
//       </div>
//       <Badge className="bg-primary-light">2</Badge>
//       <div className="flex flex-col justify-center items-center">
//         <p className="text-muted-foreground text-sm">14:07</p>
//         <BellOff color="red" size={18} />
//       </div>
//     </div>
//   </CardContent>
// </Card>;
