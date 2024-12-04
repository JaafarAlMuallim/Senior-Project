"use client";
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
import { groupColumns } from "@/models/group-columns";
import {
  TrendingUp,
  TrendingDown,
  BotMessageSquare,
  MessageSquare,
  MessagesSquare,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useState } from "react";
import ViewToggle from "./ViewToggle";

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
type GroupData = {
  msgCount: number;
  monthMsg: number;
  groupMsg: number;
  aiMsg: number;
  groupByDayArr: {
    date: string;
    messages: {
      createdAt: string;
    }[];
  }[];
  messageCountByGroup: {
    groupId: string;
    count: number;
  }[];
};

const GroupTabContent = async ({ data }: { data: GroupData }) => {
  const [isTableView, setIsTableView] = useState(false);
  const {
    msgCount,
    monthMsg,
    groupMsg,
    aiMsg,
    groupByDayArr,
    messageCountByGroup,
  } = data;

  return (
    <TabsContent value="groups" className="p-3">
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
                  <div className="text-4xl font-semibold ">
                    {formatNumber(msgCount)}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {monthMsg / (msgCount - monthMsg) > 0 ? (
                      <TrendingUp color="#5A8156" />
                    ) : (
                      <TrendingDown color="#BB5653" />
                    )}
                    {`${((monthMsg / (msgCount - monthMsg)) * 100).toFixed(2)}% from last month`}
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
                  <div className="text-4xl font-semibold">
                    {formatNumber(groupMsg)}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {groupMsg / (msgCount - groupMsg) > 0 ? (
                      <TrendingUp color="#5A8156" />
                    ) : (
                      <TrendingDown color="#BB5653" />
                    )}
                    {`${((groupMsg / (msgCount - groupMsg)) * 100).toFixed(2)}% from last month`}
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
                  <div className="text-4xl font-semibold">
                    {formatNumber(aiMsg)}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {aiMsg / (msgCount - aiMsg) > 0 ? (
                      <TrendingUp color="#5A8156" />
                    ) : (
                      <TrendingDown color="#BB5653" />
                    )}
                    {`${((aiMsg / (msgCount - aiMsg)) * 100).toFixed(2)}% from last month`}
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <DataTable
              columns={groupColumns}
              data={messageCountByGroup}
              placeholder="Filter Course Name..."
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
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={groupByDayArr}
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
                    <div className="flex justify-around gap-4">
                      <Bar
                        dataKey={"groups"}
                        accumulate="sum"
                        fill={`var(--color-groups)`}
                      />
                      <Bar
                        dataKey={"ai"}
                        accumulate="sum"
                        fill={`var(--color-ai)`}
                      />
                    </div>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      <ViewToggle isTableView={isTableView} setIsTableView={setIsTableView} />
    </TabsContent>
  );
};

export default GroupTabContent;
