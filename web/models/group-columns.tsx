"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Group = {
  groupName: string;
  lastMsgDate: Date;
  type: string;
  messageCount: number;
};

export const groupColumns: ColumnDef<Group>[] = [
  {
    header: "Group Name",
    accessorKey: "groupName",
  },
  {
    header: "Last Message",
    cell: ({ row }) => {
      return (
        <p className="">{row.original.lastMsgDate.toLocaleDateString()}</p>
      );
    },
  },
  {
    header: "Type",
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.type}</p>;
    },
  },
  {
    header: "Message Count",
    accessorKey: "messageCount",
    cell: ({ row }) => {
      return <p className="px-8">{row.original.messageCount}</p>;
    },
  },
];
