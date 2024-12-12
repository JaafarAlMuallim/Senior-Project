"use client";
import { ReportCategory } from "../../server/node_modules/@prisma/postgres/client";
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
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  content: string;
  category: ReportCategory;
  title: string;
};
export type Categories = ReportCategory;

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
    cell: ({ row }) => {
      return <p className="">{row.original.createdAt.toLocaleDateString()}</p>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return (
        <p className={row.original.status ? "text-green-500" : "text-red-500"}>
          {row.original.status ? "Closed" : "Open"}
        </p>
      );
    },
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
              <div className="mx-4 border-2 rounded-md p-4">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl font-semibold">
                    {report.title} - {report.category}
                  </h4>
                  <p>{report.content}</p>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );
    },
  },
];
