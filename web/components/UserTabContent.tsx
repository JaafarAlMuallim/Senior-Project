"use client";
import { userColumns } from "@/models/user-columns";
import { DataTable } from "./DataTable";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";
import {
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { USER } from "@/validators/option-validators";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { USER_CHART } from "@/validators/chart-options";
import { formatNumber } from "@/lib/utils";
import ViewToggle from "./ViewToggle";
import { useState } from "react";
const userChartConfig = {
  users: {
    label: "Users",
  },
  ...USER_CHART,
} satisfies ChartConfig;

type UserData = {
  userCount: number;
  tutorCount: number;
  adminCount: number;
  allUsers: {
    id: string;
    email: string;
    name: string;
    clerkId: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    profileId: string | null;
    groupId: string | null;
  }[];
  monthUsers: number;
  activeUsers: number;
};
const UserTabContent = ({ data }: { data: UserData }) => {
  const [isTableView, setIsTableView] = useState(false);
  const {
    userCount,
    tutorCount,
    adminCount,
    allUsers,
    monthUsers,
    activeUsers,
  } = data;

  const userChart = USER.options.map((user) => {
    if (user.value === "student") {
      return {
        type: user.label,
        users: userCount - tutorCount - adminCount,
        fill: `var(--color-${user.value})`,
      };
    }
    if (user.value === "tutor") {
      return {
        type: user.label,
        users: tutorCount,
        fill: `var(--color-${user.value})`,
      };
    }
    if (user.value === "admin") {
      return {
        type: user.label,
        users: adminCount,
        fill: `var(--color-${user.value})`,
      };
    }
  });

  return (
    <TabsContent value="users" className="p-3">
      {isTableView ? (
        <div className="container mx-auto py-10">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold ">{userCount}</div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2">
                  {monthUsers > 0 ? (
                    <TrendingUp color="#5A8156" />
                  ) : (
                    <TrendingDown color="#BB5653" />
                  )}
                  {`${((monthUsers / (userCount - monthUsers)) * 100).toFixed(2)}% from last month`}
                </CardDescription>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <UserCheck className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold">
                  {formatNumber(activeUsers)}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2">
                  {activeUsers > 0 ? (
                    <TrendingUp color="#5A8156" />
                  ) : (
                    <TrendingDown color="#BB5653" />
                  )}
                  {`${((activeUsers / (userCount - activeUsers)) * 100).toFixed(2)}% from last month`}
                </CardDescription>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <UserPlus className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold">{monthUsers}</div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2">
                  {monthUsers > 0 ? (
                    <TrendingUp color="#5A8156" />
                  ) : (
                    <TrendingDown color="#BB5653" />
                  )}
                  {`${((monthUsers / (userCount - monthUsers)) * 100).toFixed(2)}% from last month`}
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
          <DataTable
            columns={userColumns}
            data={allUsers.filter((user) => !user.email.includes("EduLink"))}
            placeholder="Filter emails.."
            tColumn="email"
          />
        </div>
      ) : (
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader>
              <CardTitle>Users of each type</CardTitle>
              <CardDescription>
                Distribution of users across different types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={userChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={userChart}
                    dataKey="users"
                    nameKey="type"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-semibold"
                              >
                                {userCount}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                User
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
      <ViewToggle isTableView={isTableView} setIsTableView={setIsTableView} />
    </TabsContent>
  );
};
export default UserTabContent;
