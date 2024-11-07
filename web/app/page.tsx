
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
  Bar, 
  BarChart,
  Rectangle,
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { MoreHorizontal, ArrowUpDown, TrendingUp } from "lucide-react"
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

    const categoryCounts = reports.reduce((acc, report) => {
        const category = report.category;
        if (acc[category]) {
            acc[category] += 1;
        } else {
            acc[category] = 1;
        }
        return acc;
    }, {});

    const reportChartData = Object.entries(categoryCounts).map(([category, count]) => ({
        category: category,
        reports: count,
    }));

    const uniqueCategories = [...new Set(reports.map(report => report.category))];

    const reportChartConfig = {
        visitors: {
            label: "Visitors",
        },
        ...uniqueCategories.reduce((config, category, index) => {
            config[category] = {
                label: category,
                color: `hsl(var(--chart-${index + 1}))`
            };
            return config;
        }, {})
    } satisfies ChartConfig


  const messages = [
    { date: "2024-11-01", groups: 30, ai: 10 },
    { date: "2024-11-02", groups: 45, ai: 20 },
    { date: "2024-11-03", groups: 50, ai: 15 },
    { date: "2024-11-04", groups: 60, ai: 18 },
    { date: "2024-11-05", groups: 35, ai: 20 },
    { date: "2024-11-06", groups: 50, ai: 25 },
    { date: "2024-11-07", groups: 80, ai: 40 },
    { date: "2024-11-08", groups: 55, ai: 30 },
    { date: "2024-11-09", groups: 60, ai: 25 },
    { date: "2024-11-10", groups: 60, ai: 48 },
    { date: "2024-11-11", groups: 35, ai: 20 },
    { date: "2024-11-12", groups: 50, ai: 25 },
  ];

    const chartConfig = {
        views: {
            label: "Messgaes",
        },
        groups: {
            label: "Groups",
            color: "hsl(var(--chart-1))",
        },
        ai: {
            label: "AI",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

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

    const [isTableView, setIsTableView] = useState(true);

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("groups")
    const total = React.useMemo(
        () => ({
            groups: messages.reduce((acc, curr) => acc + curr.groups, 0),
            ai: messages.reduce((acc, curr) => acc + curr.ai, 0),
        }),
        []
    )


    const toggleView = () => {
        setIsTableView(!isTableView);
    };

  return (
      <Tabs defaultValue="users" className="mt-12  flex-col">
          <TabsList className=" flex-col fixed py-8 px-2">
              <TabsTrigger className=" flex-col px-4 rounded-2xl" value="users">
                      <FaUser />
                      <div className="text-sm">Users</div>
              </TabsTrigger>
              <TabsTrigger className=" flex-col px-4 rounded-2xl" value="groups">
                  <FaUsers />
                  <div className="text-sm">Groups</div>
              </TabsTrigger>
              <TabsTrigger className=" flex-col px-4 rounded-2xl" value="reports">
                  <FaClipboardList />
                  <div className="text-sm">Reports</div>
              </TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="p-3">
          <div className="pl-28">
                  <div className="text-2xl">Table of users</div>
                  <div className="container mx-auto py-10">
                      <DataTable columns={columns} data={users} placeholder="Filter emails.." tcolumn="email" />
                  </div>
          </div>
          </TabsContent>
          <TabsContent value="groups" className="p-3">
          <div>
              {isTableView ? (
              <div className="pl-28">
                  <div className="text-2xl">Table of groups</div>
                  <div className="container mx-auto py-10">
                      <DataTable columns={columnsGroups} data={groups} placeholder="Filter course name.." tcolumn="name" />
                  </div>
              </div>): (
                  <div className="pl-28">
                    <div className="text-2xl">Chart of messgaes</div>
                    <div className="container mx-auto py-10">
                              <Card>
                                  <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                                      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                          <CardTitle>Messages Bar Chart</CardTitle>
                                          <CardDescription>
                                              Showing number of daily messages 
                                          </CardDescription>
                                      </div>
                                      <div className="flex">
                                          {["groups", "ai"].map((key) => {
                                              const chart = key as keyof typeof chartConfig
                                              return (
                                                  <button
                                                      key={chart}
                                                      data-active={activeChart === chart}
                                                      className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                                      onClick={() => setActiveChart(chart)}
                                                  >
                                                      <span className="text-xs text-muted-foreground">
                                                          {chartConfig[chart].label}
                                                      </span>
                                                      <span className="text-lg font-bold leading-none sm:text-3xl">
                                                          {total[key as keyof typeof total].toLocaleString()}
                                                      </span>
                                                  </button>
                                              )
                                          })}
                                      </div>
                                  </CardHeader>
                                  <CardContent className="px-2 sm:p-6">
                                      <ChartContainer
                                          config={chartConfig}
                                          className="aspect-auto h-[250px] w-full"
                                      >
                                          <BarChart
                                              accessibilityLayer
                                              data={messages}
                                              margin={{
                                                  left: 12,
                                                  right: 12,
                                              }}
                                          >
                                              <CartesianGrid vertical={false} />
                                              <XAxis
                                                  dataKey="date"
                                                  tickLine={false}
                                                  axisLine={false}
                                                  tickMargin={8}
                                                  minTickGap={32}
                                                  tickFormatter={(value) => {
                                                      const date = new Date(value)
                                                      return date.toLocaleDateString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                      })
                                                  }}
                                              />
                                              <ChartTooltip
                                                  content={
                                                      <ChartTooltipContent
                                                          className="w-[150px]"
                                                          nameKey="views"
                                                          labelFormatter={(value) => {
                                                              return new Date(value).toLocaleDateString("en-US", {
                                                                  month: "short",
                                                                  day: "numeric",
                                                                  year: "numeric",
                                                              })
                                                          }}
                                                      />
                                                  }
                                              />
                                              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                                          </BarChart>
                                      </ChartContainer>
                                  </CardContent>
                              </Card>
                    </div>
                  </div>)
              }
              <div className="z-30">
              <button
                  onClick={toggleView}
                  className="fixed bottom-8 right-8 px-4 py-2 rounded-full font-semibold bg-selected text-white shadow-lg hover:bg-primary-dark/90 focus:outline-none"
              >
                  {isTableView ? 'Switch to Chart' : 'Switch to Table'}
              </button>
              </div>
           </div>
          </TabsContent>
          <TabsContent value="reports" className="p-3">
              <div>
                  {isTableView ? (
                      <div className="pl-28">
                          <div className="text-2xl">Table of reports</div>
                          <div className="container mx-auto py-10">
                              <DataTable columns={columnsReports} data={reports} placeholder="Filter category.." tcolumn="category" />
                          </div>
                      </div>) : (
                      <div className="pl-28">
                          <div className="text-2xl">Chart of reports</div>
                          <div className="container mx-auto py-10">
                                  <Card>
                                      <CardHeader>
                                          <CardTitle>Reports of each category</CardTitle>
                                          <CardDescription>Amount of reports submitted to each categiry</CardDescription>
                                      </CardHeader>
                                      <CardContent>
                                          <ChartContainer config={reportChartConfig}>
                                              <BarChart accessibilityLayer data={reportChartData}>
                                                  <CartesianGrid vertical={false} />
                                                  <XAxis
                                                      dataKey="category"
                                                      tickLine={false}
                                                      tickMargin={10}
                                                      axisLine={false}
                                                      tickFormatter={(value) =>
                                                          reportChartConfig[value as keyof typeof reportChartConfig]?.label
                                                      }
                                                  />
                                                  <ChartTooltip
                                                      cursor={false}
                                                      content={<ChartTooltipContent hideLabel />}
                                                  />
                                                  <Bar
                                                      dataKey="reports"
                                                      strokeWidth={2}
                                                      radius={8}
                                                      activeIndex={2}
                                                      activeBar={({ ...props }) => {
                                                          return (
                                                              <Rectangle
                                                                  {...props}
                                                                  fillOpacity={0.8}
                                                                  stroke={props.payload.fill}
                                                                  strokeDasharray={4}
                                                                  strokeDashoffset={4}
                                                              />
                                                          )
                                                      }}
                                                  />
                                              </BarChart>
                                          </ChartContainer>
                                      </CardContent>
                                  </Card>
                          </div>
                      </div>)
                  }
                  <div className="z-30">
                      <button
                          onClick={toggleView}
                          className="fixed bottom-8 right-8 px-4 py-2 rounded-full font-semibold bg-selected text-white shadow-lg hover:bg-primary-dark/90 focus:outline-none"
                      >
                          {isTableView ? 'Switch to Chart' : 'Switch to Table'}
                      </button>
                  </div>
              </div>
          </TabsContent>
      </Tabs>
  );
};

export default MainDashboard;
