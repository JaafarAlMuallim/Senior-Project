import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ScheduleTable = ({ department }: { department: string }) => {
  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>COURSE</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>CRN</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead>INSTRUCTOR</TableHead>
            <TableHead>DAY</TableHead>
            <TableHead>TIME</TableHead>
            <TableHead>LOCATION</TableHead>
            <TableHead>ADD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {department ? (
            <TableRow>
              <TableCell>CS101</TableCell>
              <TableCell>Lecture</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>Introduction to Programming</TableCell>
              <TableCell>Dr. Smith</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>10:00</TableCell>
              <TableCell>Room 101</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                Select a department to start 🔍...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
