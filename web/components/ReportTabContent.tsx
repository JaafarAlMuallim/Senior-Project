"use client";
import { reportColumns, Report } from "@/models/report-columns";
import { TabsContent } from "./ui/tabs";
import { DataTable } from "./DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PieChart, Pie, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { REPORT_CHART } from "@/validators/chart-options";
import { useMemo } from "react";
import { REPORT } from "@/validators/option-validators";
import {
  TrendingUp,
  TrendingDown,
  MessageSquareWarning,
  FileStack,
  FileCheck,
} from "lucide-react";

const reportChartConfig = {
  reports: {
    label: "Reports",
  },
  ...REPORT_CHART,
} satisfies ChartConfig;

const ReportTabContent = ({
  isTableView,
  data,
  categoryCounts,
}: {
  isTableView: boolean;
  data: Report[];
  categoryCounts: Record<string, number>;
}) => {
  const reportChart = useMemo(() => {
    return REPORT.options.map((report) => {
      return {
        category: report.label,
        reports:
          categoryCounts[report.value as keyof typeof categoryCounts] || 0,
        fill: `var(--color-${report.value})`,
      };
    });
  }, [categoryCounts]);

  const totalReports = Object.values(categoryCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <TabsContent value="reports" className="p-3">
      {isTableView ? (
        <>
          <div className="container mx-auto py-10">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Reports
                  </CardTitle>
                  <FileStack className="h-8 w-8" />
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
                    Closed Reports
                  </CardTitle>
                  <FileCheck className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black">234</div>
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
                    Most Reported Category
                  </CardTitle>
                  <MessageSquareWarning className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black">Suggestion</div>
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
              columns={reportColumns}
              data={data}
              placeholder="Filter category.."
              tColumn="category"
            />
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto py-10">
            <Card>
              <CardHeader>
                <CardTitle>Reports of each category</CardTitle>
                <CardDescription>
                  Amount of reports submitted to each categiry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={reportChartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={reportChart}
                      dataKey="reports"
                      nameKey="category"
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
                                  {totalReports}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Report
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
        </>
      )}
    </TabsContent>
  );
};
export default ReportTabContent;
