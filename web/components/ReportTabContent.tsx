"use client";
import { reportColumns, Report } from "@/models/report-columns";
import { TabsContent } from "./ui/tabs";
import { DataTable } from "./DataTable";
import {
  Card,
  CardContent,
  CardDescription,
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
    0,
  );

  return (
    <TabsContent value="reports" className="p-3">
      {isTableView ? (
        <>
          <h2 className="text-2xl">Table of reports</h2>
          <div className="container mx-auto py-10">
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
          <h2 className="text-2xl">Chart of reports</h2>
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
