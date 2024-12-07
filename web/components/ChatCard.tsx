import { BellOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { trpc } from "@/trpc/client";
import { ChatGroup } from "@/models/chatGroups";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

const ChatCard = ({
  chat,
  selectedChat,
}: {
  chat: ChatGroup;
  selectedChat: string;
}) => {
  const { data: lastMsg, isLoading } = trpc.messages.getLastMessage.useQuery({
    groupId: chat.group.groupId,
  });
  console.log(chat.group.groupId);
  const { data: notificationCount } = trpc.messages.getUnreadCount.useQuery({
    groupId: chat.group.groupId,
  });

  return (
    <Card
      className={`bg-white hover:bg-secondary-lightGray cursor-pointer transition-colors ${selectedChat === chat.group.groupId ? "ring-2 ring-blue-500" : ""}`}
    >
      <CardContent className="p-4 flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={`https://github.com/shadcn.png`} />
          <AvatarFallback className="bg-violet-700 text-white">
            JA
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="text-lg font-semibold">{chat.group.name}</h4>
          {isLoading ? (
            <Skeleton className="w-28 h-4" />
          ) : !!lastMsg ? (
            <p className="text-sm text-gray-500">
              {!!lastMsg.text
                ? `${lastMsg?.text.substring(0, 30)}${lastMsg.text.length > 10 ? "..." : ""}`
                : "Attachment"}
            </p>
          ) : (
            <p className="text-sm text-gray-500">No messages</p>
          )}
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-xs text-gray-500">14:07</p>
          <div className="flex items-center gap-4">
            {!!notificationCount && selectedChat !== chat.group.groupId && (
              <Badge className="bg-primary-light text-white-default">
                {notificationCount}
              </Badge>
            )}
            {chat.isMuted && <BellOff size={16} className="text-red-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ChatCard;
