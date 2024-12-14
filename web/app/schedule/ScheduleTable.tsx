"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import Section from "@/models/section";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const timeIntersection = (
  a: [Date, Date],
  b: [Date, Date],
  days1: string,
  days2: string,
) => {
  const [start1, end1] = a;
  const [start2, end2] = b;
  if (days1.split("").some((day) => days2.includes(day))) {
    if (
      start1.getTime() === start2.getTime() ||
      end1 === end2 ||
      start1 === end2 ||
      end1 === start2
    ) {
      return true;
    }
    console.log({
      start1: start1.getTime(),
      end1: end1.getTime(),
      start2: start2.getTime(),
      end2: end2.getTime(),
    });
    if (start1 < start2) {
      console.log("END1 START2");
      console.log(end1, start2);
      return end1 > start2 || end1 === start2;
    }
    console.log("END2 START1");
    console.log(end2, start1);
    return end2 > start1 || end2 === start1;
  }
};

export const ScheduleTable = ({
  sections,
  currSections,
}: {
  sections: Section[];
  currSections: Schedule[];
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useUtils();
  const [selected, setSelected] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { mutate: registerSection } = trpc.schedule.createSchedule.useMutation({
    onSuccess: () => {
      toast({
        title: "Section Added",
        description: "The selected section has been added to your schedule",
        className: "bg-success-600 text-primary-white",
      });
      utils.schedule.getSchedule.invalidate({
        semester: "241",
      });
      setLoading(false);
      setSelected(null);
      router.refresh();
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      setSelected(null);
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while adding the section",
        variant: "destructive",
      });
    },
  });

  const filteredSections = useMemo(() => {
    if (!sections.length) return [];

    return sections.filter((section) => {
      const gender = searchParams.get("gender");
      const addable = searchParams.get("addableOnly");
      const days = searchParams.get("days")?.split(",") || [];
      const instructors = searchParams.get("instructors")?.split(",") || [];
      const course = searchParams.get("course");

      if (gender === "female" && !section.title.includes("-F")) {
        return false;
      }

      if (addable === "true") {
        const isAddable =
          !currSections.find((curr) => curr.section.id === section.id) &&
          currSections.every(
            (curr) =>
              !timeIntersection(
                [section.startTime, section.endTime],
                [curr.section.startTime, curr.section.endTime],
                section.recurrence ?? "",
                curr.section.recurrence ?? "",
              ),
          );
        if (!isAddable) return false;
      }

      if (
        days.length &&
        !days.every((day) => section.recurrence?.includes(day))
      ) {
        return false;
      }

      if (
        instructors.length &&
        !instructors.some((instructor) =>
          section.instructor?.includes(instructor),
        )
      ) {
        return false;
      }

      if (course && !section.course.id.includes(course)) {
        return false;
      }

      return true;
    });
  }, [sections, searchParams, currSections]);

  const addSection = (section: Section) => {
    const intersection = currSections.some((curr) =>
      timeIntersection(
        [section.startTime, section.endTime],
        [curr.section.startTime, curr.section.endTime],
        section.recurrence ?? "",
        curr.section.recurrence ?? "",
      ),
    );

    const sameCourse = currSections.some(
      (curr) => curr.section.course.id === section.course.id,
    );

    if (intersection || sameCourse) {
      toast({
        title: "Conflict",
        description:
          "The selected section conflicts with an existing course time or the same course is already in your schedule",
        variant: "destructive",
      });
      return;
    }
    registerSection({
      semester: "241",
      sectionId: section.id,
    });
  };

  const renderTime = (time: Date) => {
    return time
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      .substring(0, 5);
  };

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>COURSE</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead>INSTRUCTOR</TableHead>
            <TableHead>DAY</TableHead>
            <TableHead className="w-32">TIME</TableHead>
            <TableHead>LOCATION</TableHead>
            <TableHead>ADD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <TableRow key={section.id}>
                <TableCell className="uppercase">{section.title}</TableCell>
                <TableCell className="capitalize">
                  {section.course.name}
                </TableCell>
                <TableCell>{section.instructor ?? "-"}</TableCell>
                <TableCell>{section.recurrence ?? "-"}</TableCell>
                <TableCell>
                  {section.startTime && section.endTime
                    ? `${renderTime(section.startTime)} - ${renderTime(section.endTime)}`
                    : "-"}
                </TableCell>
                <TableCell>{section.location ?? "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className=" text-primary-black hover:bg-primary-light hover:text-white-default"
                    size="sm"
                    onClick={() => {
                      addSection(section);
                      setSelected(section.id);
                    }}
                  >
                    {section.id === selected && loading ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No matching sections found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Section from "@/models/section";
// import { useSearchParams } from "next/navigation";
// import { useMemo } from "react";
//
// const timeIntersection = (a: [number, number], b: [number, number]) => {
//   const [start1, end1] = a;
//   const [start2, end2] = b;
//   if (start1 < start2) {
//     return end1 > start2;
//   }
//   return end2 > start1;
// };
//
// export const ScheduleTable = ({
//   sections,
//   currSections,
// }: {
//   sections: Section[];
//   currSections: Schedule[];
// }) => {
//   const searchParams = useSearchParams();
//
//   const filteredSections = useMemo(() => {
//     if (!sections.length) return [];
//     const filtered = sections;
//     const gender = searchParams.get("gender");
//     const addable = searchParams.get("addableOnly");
//     const days = searchParams.getAll("days");
//     const instructors = searchParams.getAll("instructors");
//     const course = searchParams.get("course");
//     if (gender === "F") {
//       filtered.filter((section) => section.title.includes("-F"));
//     }
//     if (addable === "true") {
//       filtered.filter(
//         (section) =>
//           !currSections.find((curr) => curr.section.id === section.id) &&
//           timeIntersection(
//             [section.startTime.getTime(), section.endTime.getTime()],
//             [
//               currSections[0].section.startTime.getTime(),
//               currSections[0].section.endTime.getTime(),
//             ],
//           ),
//       );
//     }
//     if (days.length) {
//       filtered.filter((section) =>
//         days.every((day) => section.recurrence?.includes(day)),
//       );
//     }
//     if (instructors.length) {
//       filtered.filter((section) =>
//         instructors.some((instructor) =>
//           section.instructor?.includes(instructor),
//         ),
//       );
//     }
//     if (course) {
//       filtered.filter((section) => section.course.code.includes(course));
//     }
//   }, [sections, searchParams]);
//
//   const renderTime = (time: Date) => {
//     return time.toLocaleTimeString().substring(0, 5);
//   };
//
//   return (
//     <div className="rounded-md border w-full">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>COURSE</TableHead>
//             <TableHead>TITLE</TableHead>
//             <TableHead>INSTRUCTOR</TableHead>
//             <TableHead>DAY</TableHead>
//             <TableHead className="w-32">TIME</TableHead>
//             <TableHead>LOCATION</TableHead>
//             <TableHead>ADD</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {sections.length > 0 ? (
//             sections.map((section) => (
//               <TableRow key={section.id}>
//                 <TableCell className="uppercase">{section.title}</TableCell>
//                 <TableCell className="capitalize">
//                   {section.course.name}
//                 </TableCell>
//                 <TableCell>{section.instructor ?? "-"}</TableCell>
//                 <TableCell>{section.recurrence ?? "-"}</TableCell>
//                 <TableCell>
//                   {section.startTime && section.endTime
//                     ? `${renderTime(section.startTime)} - ${renderTime(section.endTime)}`
//                     : "-"}
//                 </TableCell>
//                 <TableCell>{section.location ?? "-"}</TableCell>
//                 <TableCell>
//                   <Button variant="outline" size="sm">
//                     Add
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={7} className="h-24 text-center">
//                 Select a department to start 🔍...
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };
