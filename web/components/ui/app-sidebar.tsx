import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  BellOff,
  ChevronDown,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function ChatSidebar({
  aiChat,
  regularChats,
  onClick,
  selectedChat,
}: {
  aiChat: any;
  regularChats: any;
  onClick: (arg: string) => void;
  selectedChat: string;
}) {
  return (
    <Sidebar className="mt-16">
      <SidebarContent>
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
                {aiChat.map((chat: any) => (
                  <SidebarMenuItem key={chat} onClick={() => onClick(chat)}>
                    <Card
                      key={chat}
                      className={`bg-white hover:bg-secondary-lightGray cursor-pointer transition-colors ${selectedChat === chat ? "ring-2 ring-blue-500" : ""}`}
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
                          <p className="text-sm text-gray-500">
                            Last message...
                          </p>
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
                {regularChats.map((chat: any) => (
                  <SidebarMenuItem key={chat}>
                    <Card
                      key={chat}
                      className={`bg-white hover:bg-secondary-lightGray cursor-pointer transition-colors ${selectedChat === chat ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => onClick(chat)}
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
                          <p className="text-sm text-gray-500">
                            Last message...
                          </p>
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
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
