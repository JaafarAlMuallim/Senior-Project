import { User, userColumns } from "@/models/user-columns";
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
import { useMemo } from "react";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { USER_CHART } from "@/validators/chart-options";
const userChartConfig = {
  users: {
    label: "Users",
  },
  ...USER_CHART,
} satisfies ChartConfig;
const UserTabContent = ({
  isTableView,
  data,
  typeCounts,
}: {
  data: User[];
  isTableView: boolean;
  typeCounts: Record<string, number>;
}) => {
  const userChart = useMemo(() => {
    return USER.options.map((user) => {
      return {
        type: user.label,
        users: typeCounts[user.value as keyof typeof typeCounts] || 0,
        fill: `var(--color-${user.value})`,
      };
    });
  }, [typeCounts]);

  const totalUsers = Object.values(typeCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );
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
                  Active Users
                </CardTitle>
                <UserCheck className="h-8 w-8" />
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
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <UserPlus className="h-8 w-8" />
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
            columns={userColumns}
            data={data}
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
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalUsers}
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
    </TabsContent>
  );
};
export default UserTabContent;
