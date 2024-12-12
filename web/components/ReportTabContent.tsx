"use client";
import { Categories, reportColumns } from "@/models/report-columns";
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
import { REPORT } from "@/validators/option-validators";
import {
  TrendingUp,
  TrendingDown,
  MessageSquareWarning,
  FileStack,
  FileCheck,
  Minus,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useState } from "react";
import ViewToggle from "./ViewToggle";

const reportChartConfig = {
  reports: {
    label: "Reports",
  },
  ...REPORT_CHART,
} satisfies ChartConfig;

type ReportData = {
  reportCount: number;
  monthReports: number;
  closedReports: number;
  allReports: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    category: Categories;
    title: string;
    content: string;
  }[];
  allByCategory: Record<string, number>;
  allByCategoryArr: {
    category: string;
    count: number;
  }[];
};

const ReportTabContent = ({ data }: { data: ReportData }) => {
  const [isTableView, setIsTableView] = useState(false);
  const {
    reportCount,
    monthReports,
    closedReports,
    allReports,
    allByCategory,
    allByCategoryArr,
  } = data;

  const reportChart = REPORT.options.map((report) => {
    return {
      category: report.label,
      reports: allByCategory[report.value] || 0,
      fill: `var(--color-${report.value})`,
    };
  });
  console.log(data);
  console.log(allByCategoryArr);

  const mostReportedCategory =
    allByCategoryArr.length > 0
      ? allByCategoryArr.reduce((a, b) => (a.count > b.count ? a : b))
      : { category: "None", count: 0 };

  const percentagFormat = (count: number, mostCount: number) => {
    const denominator = count - mostCount;
    if (denominator <= 0 || isNaN(denominator) || mostCount === 0) {
      return (
        <div className="flex items-center gap-2">
          <Minus color="black" />
          0% from last month
        </div>
      );
    }
    const percentage = (mostCount / denominator) * 100;
    return (
      <div className="flex items-center gap-2">
        {percentage > 0 ? (
          <TrendingUp color="#5A8156" />
        ) : (
          <TrendingDown color="#BB5653" />
        )}
        {percentage.toFixed(2)}% from last month
      </div>
    );
  };

  // {
  //   (() => {
  //     const denominator = reportCount - mostReportedCategory.count;
  //     if (denominator <= 0 || isNaN(denominator)) {
  //       return null;
  //     }
  //     const percentage = (mostReportedCategory.count / denominator) * 100;
  //     return `${percentage.toFixed(2)}% from last month`;
  //   })()
  // }

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
                  <div className="text-4xl font-semibold ">
                    {formatNumber(reportCount)}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {percentagFormat(reportCount, monthReports)}
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
                  <div className="text-4xl font-semibold">
                    {formatNumber(closedReports)}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {percentagFormat(reportCount, closedReports)}
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
                  <div className="text-4xl font-semibold capitalize">
                    {mostReportedCategory.category}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    {percentagFormat(reportCount, mostReportedCategory.count)}
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <DataTable
              columns={reportColumns}
              data={allReports}
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
                                  className="fill-foreground text-3xl font-semibold"
                                >
                                  {reportCount}
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
      <ViewToggle isTableView={isTableView} setIsTableView={setIsTableView} />
    </TabsContent>
  );
};
export default ReportTabContent;
