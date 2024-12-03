export type ChatGroup = {
  id: string;
  groupId: string;
  userId: string;
  group: {
    id: string;
    name: string;
    type: "AI" | "INDIVIDUAL" | "GROUP";
    groupId: string;
    ownerId: string | null;
  };
  isMuted: boolean;
};
