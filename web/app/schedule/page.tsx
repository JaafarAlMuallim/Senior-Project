import { Suspense } from "react";
import ScheduleClient from "./ScheduleClient";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ScheduleTable } from "./ScheduleTable";
import { trpc } from "@/trpc/server";
import ScheduleVisualization from "./scheduleVisualization";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const scheduleData = await trpc.schedule.getSchedule({ semester: "241" });

  return (
    <MaxWidthWrapper className="my-8 px-12 flex flex-col gap-8">
      <Suspense fallback={"Loading..."}>
        <ScheduleVisualization schedule={scheduleData} />
      </Suspense>
      <ScheduleClient searchParams={searchParams} />
      <ScheduleTable />
    </MaxWidthWrapper>
  );
}
