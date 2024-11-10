"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Report = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  status: string;
};

export const reportColumns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 px-4 flex justify-start items-center"
              >
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(report.id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>Details</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(report.id)}
                >
                  <Button variant={"destructive"}>Close Report</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          <DialogPortal>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Report #{report.id}</DialogTitle>
              </DialogHeader>
              <div className="mx-4 border-2 rounded-md">
                <div className="flex flex-col gap-12">
                  <h4 className="text-xl font-semibold">
                    {report.title} - {report.category}
                  </h4>
                  <p>{report.description}</p>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );
    },
  },
];
