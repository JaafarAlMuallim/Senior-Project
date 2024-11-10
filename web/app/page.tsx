"use client";
import React, { useState } from "react";
import {
  XAxis,
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
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTable } from "../components/ui/data-table";
import { FaUser, FaUsers, FaClipboardList } from "react-icons/fa";
import { MoreHorizontal, ArrowUpDown, TrendingUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// types just for experiment
type Users = {
  id: string;
  email: string;
  name: string;
  date: string;
};

const MainDashboard = () => {
  //data
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

  const [reports, setReports] = useState([
    {
      id: "12345",
      title: "Forgot password",
      category: "Security",
      date: "2024/12/06",
      description: "Password forgotten and email lost.",
      status: "open",
    },
    {
      id: "12445",
      title: "University integration",
      category: "Suggestion",
      date: "2024/12/06",
      description:
        "Suggestion: why not to integrate the app with KFUPM portal.",
      status: "closed",
    },
    {
      id: "15345",
      title: "App crashed",
      category: "Bug",
      date: "2024/12/06",
      description:
        "I just encountered an issue with the app that I wanted to report.",
      status: "open",
    },
    {
      id: "18345",
      title: "Forgot password",
      category: "Security",
      date: "2024/12/06",
      description: "Password forgotten and email lost.",
      status: "closed",
    },
  ]);

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

  //report chart configuration
  const categoryCounts = reports.reduce((acc, report) => {
    const category = report.category;
    if (acc[category]) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const reportChartData = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      category: category,
      reports: count,
    }),
  );

  const uniqueCategories = [
    ...new Set(reports.map((report) => report.category)),
  ];

  const reportChartConfig = {
    visitors: {
      label: "Visitors",
    },
    ...uniqueCategories.reduce((config, category, index) => {
      config[category] = {
        label: category,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    }, {}),
  } satisfies ChartConfig;

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
  } satisfies ChartConfig;

  //data tables content (users, groups, reports)
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
        );
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
        const user = row.original;

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
        );
      },
    },
  ];

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
        );
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
        const group = row.original;

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
        );
      },
    },
  ];

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
        );
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`font-semibold ${
              status === "open" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original;

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(report.title)}
                  >
                    Copy report name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
            <DialogPortal>
              <DialogOverlay className="DialogOverlay" />
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>{report.title}</DialogTitle>
                </DialogHeader>
                <div className="mx-3 border-2 rounded-md">
                  <div className="flex flex-row space-x-64 pt-6 border-b-2 p-2">
                    <div className=" ">{report.category}</div>
                    <div className="">{report.date}</div>
                  </div>
                  <div className="grid gap-4 py-4 p-2">
                    <div className="">Description</div>
                    <div className="text-muted-foreground pb-8">
                      {report.description}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setReports((prevReports) =>
                        prevReports.map((r) =>
                          r.id === report.id
                            ? {
                                ...r,
                                status: r.status === "open" ? "closed" : "open",
                              }
                            : r,
                        ),
                      );
                    }}
                    className={`mt-6 py-2 px-4 rounded-md ${
                      report?.status === "open" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {report?.status === "open"
                      ? "Mark as Closed"
                      : "Mark as Open"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        );
      },
    },
  ];

  // table and chart view
  const [isTableView, setIsTableView] = useState(true);

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("groups");
  const total = React.useMemo(
    () => ({
      groups: messages.reduce((acc, curr) => acc + curr.groups, 0),
      ai: messages.reduce((acc, curr) => acc + curr.ai, 0),
    }),
    [],
  );

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
            <DataTable
              columns={columns}
              data={users}
              placeholder="Filter emails.."
              tcolumn="email"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="groups" className="p-3">
        <div>
          {isTableView ? (
            <div className="pl-28">
              <div className="text-2xl">Table of groups</div>
              <div className="container mx-auto py-10">
                <DataTable
                  columns={columnsGroups}
                  data={groups}
                  placeholder="Filter course name.."
                  tcolumn="name"
                />
              </div>
            </div>
          ) : (
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
                        const chart = key as keyof typeof chartConfig;
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
                              {total[
                                key as keyof typeof total
                              ].toLocaleString()}
                            </span>
                          </button>
                        );
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
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              className="w-[150px]"
                              nameKey="views"
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                );
                              }}
                            />
                          }
                        />
                        <Bar
                          dataKey={activeChart}
                          fill={`var(--color-${activeChart})`}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <div className="z-30">
            <button
              onClick={toggleView}
              className="fixed bottom-8 right-8 px-4 py-2 rounded-full font-semibold bg-selected text-white shadow-lg hover:bg-primary-dark/90 focus:outline-none"
            >
              {isTableView ? "Switch to Chart" : "Switch to Table"}
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
                <DataTable
                  columns={columnsReports}
                  data={reports}
                  placeholder="Filter category.."
                  tcolumn="category"
                />
              </div>
            </div>
          ) : (
            <div className="pl-28">
              <div className="text-2xl">Chart of reports</div>
              <div className="container mx-auto py-10">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports of each category</CardTitle>
                    <CardDescription>
                      Amount of reports submitted to each categiry
                    </CardDescription>
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
                            reportChartConfig[
                              value as keyof typeof reportChartConfig
                            ]?.label
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
                            );
                          }}
                        />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <div className="z-30">
            <button
              onClick={toggleView}
              className="fixed bottom-8 right-8 px-4 py-2 rounded-full font-semibold bg-selected text-white shadow-lg hover:bg-primary-dark/90 focus:outline-none"
            >
              {isTableView ? "Switch to Chart" : "Switch to Table"}
            </button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainDashboard;
