
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "../components/ui/chart";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTable } from "../components/ui/data-table";
import { FaUser, FaUsers, FaClipboardList } from 'react-icons/fa';
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// types just for experiment
type Users = {
    id: string
    email: string
    name: string
    date: string
}

const MainDashboard = () => {
  const [viewMode, setViewMode] = useState("table");

  const users: Users[] = [
    {
      id: "12345",
      email: "example1@gmail.com",
      name: "Ahmed Abdullah",
      date: "2024/12/06",
    },
    {
      id: "12445",
      email: "example2@gmail.com",
      name: "Saed Wael",
      date: "2024/12/06",
    },
    {
      id: "15345",
      email: "example3@gmail.com",
      name: "Ali Hassan",
      date: "2024/12/06",
    },
    {
      id: "18345",
      email: "example4@gmail.com",
      name: "Ahmed Mohammed",
      date: "2024/12/06",
    },
  ];

  const groups = [
    { id: "12345", name: "ICS 485", courseId: "23945", date: "2024/12/06" },
    { id: "12445", name: "IAS 322", courseId: "56070", date: "2024/12/06" },
    { id: "15345", name: "ISE 291", courseId: "55966", date: "2024/12/06" },
    { id: "18345", name: "SWE 316", courseId: "15967", date: "2024/12/06" },
  ];

    const reports = [
        { id: "12345", title: "Forgot password", category: "Security", date: "2024/12/06" },
        { id: "12445", title: "University integration", category: "Suggestion", date: "2024/12/06" },
        { id: "15345", title: "App crashed", category: "Bug", date: "2024/12/06" },
        { id: "18345", title: "Forgot password", category: "Security", date: "2024/12/06" },
    ];

  const messagesInGroupsData = [
    { day: "2024-11-01", messages: 30 },
    { day: "2024-11-02", messages: 45 },
    { day: "2024-11-03", messages: 50 },
  ];

  const messagesInAIData = [
    { day: "2024-11-01", messages: 10 },
    { day: "2024-11-02", messages: 20 },
    { day: "2024-11-03", messages: 15 },
    ];

    const columns: ColumnDef<Users>[] = [
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
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "date",
            header: "Date Created",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.name)}
                            >
                                Copy user name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Remove user</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const columnsGroups = [
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
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "courseId",
            header: "Course ID",
        },
        {
            accessorKey: "date",
            header: "Date Created",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const group = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(group.name)}
                            >
                                Copy group name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Remove group</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const columnsReports = [
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
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "date",
            header: "Date Created",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const report = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(report.name)}
                            >
                                Copy report name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Remove report</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

  const renderTableContent = (contentType) => {
    if (contentType === "users") {
      return (
          <div className="container mx-auto py-10">
              <DataTable columns={columns} data={users} />
          </div>
      );
    } else if (contentType === "groups") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course ID</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.courseId}</TableCell>
                <TableCell>{group.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  const renderChartContent = (contentType) => {
    const data =
      contentType === "messagesInGroups"
        ? messagesInGroupsData
        : messagesInAIData;
    const color = contentType === "messagesInGroups" ? "#4f46e5" : "#f97316";
    const label =
      contentType === "messagesInGroups"
        ? "Messages in Groups"
        : "Messages in AI";

    return (
      <ChartContainer config={{ messages: { label: "Messages", color } }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="messages" stroke={color} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
      <Tabs defaultValue="users" className="mt-12 mx-2  flex-col">
          <TabsList className=" flex-col">
              <TabsTrigger className=" flex-col px-6" value="users">
                      <FaUser />
                      <div className="text-sm">Users</div>
              </TabsTrigger>
              <TabsTrigger className=" flex-col px-6" value="groups">
                  <FaUsers />
                  <div className="text-sm">Groups</div>
              </TabsTrigger>
              <TabsTrigger className=" flex-col px-6" value="reports">
                  <FaClipboardList />
                  <div className="text-sm">Reports</div>
              </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
          <div className="pl-28">
                  <div className="text-2xl">Table of users</div>
                  <div className="container mx-auto py-10">
                      <DataTable columns={columns} data={users} placeholder="Filter emails.." tcolumn="email" />
                  </div>
          </div>
          </TabsContent>
          <TabsContent value="groups">
              <div className="pl-28">
                  <div className="text-2xl">Table of groups</div>
                  <div className="container mx-auto py-10">
                      <DataTable columns={columnsGroups} data={groups} placeholder="Filter course name.." tcolumn="name" />
                  </div>
              </div>
          </TabsContent>
          <TabsContent value="reports">
              <div className="pl-28">
                  <div className="text-2xl">Table of reports</div>
                  <div className="container mx-auto py-10">
                      <DataTable columns={columnsReports} data={reports} placeholder="Filter category.." tcolumn="category" />
                  </div>
              </div>
          </TabsContent>
      </Tabs>
  );
};

export default MainDashboard;
