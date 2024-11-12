import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TabsContent } from "./ui/tabs";
import { DataTable } from "./DataTable";
import { Group, groupColumns } from "@/models/group-columns";
import { useMemo, useState } from "react";
import { Message } from "@/models/MessageModel";
import {
  TrendingUp,
  TrendingDown,
  BotMessageSquare,
  MessageSquare,
  MessagesSquare,
} from "lucide-react";

const chartConfig = {
  msg: {
    label: "Messages",
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

const GroupTabContent = ({
  isTableView,
  data,
  messages,
}: {
  isTableView: boolean;
  data: Group[];
  messages: Message[];
}) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("groups");
  const total = useMemo(
    () => ({
      groups: messages.reduce((acc, curr) => acc + curr.groups, 0),
      ai: messages.reduce((acc, curr) => acc + curr.ai, 0),
    }),
    []
  );
  return (
    <TabsContent value="groups" className="p-3">
      {/* Switch Chart & Table */}
      {isTableView ? (
        <>
          <div className="container mx-auto py-10">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Messages
                  </CardTitle>
                  <MessagesSquare className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black ">{data.length}</div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp color="#5A8156" />
                    4% from last month
                  </CardDescription>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Group Messages
                  </CardTitle>
                  <MessageSquare className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black">1,234</div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingDown color="#BB5653" />
                    12% from last month
                  </CardDescription>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    AI Messages
                  </CardTitle>
                  <BotMessageSquare className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black">145</div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp color="#5A8156" />
                    8% from last month
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <DataTable
              columns={groupColumns}
              data={data}
              placeholder="Filter course name.."
              tColumn="name"
            />
          </div>
        </>
      ) : (
        <>
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
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-zinc-200 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(chart)}
                      >
                        <span className="text-xs">
                          {chartConfig[chart].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                          {total[key as keyof typeof total].toLocaleString()}
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
                          nameKey="msg"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                          }}
                        />
                      }
                    />
                    <Bar
                      dataKey={activeChart}
                      accumulate="sum"
                      fill={`var(--color-${activeChart})`}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </TabsContent>
  );
};

export default GroupTabContent;
