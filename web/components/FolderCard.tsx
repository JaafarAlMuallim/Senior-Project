import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { separateNameNum } from "@/lib/utils";
import Course from "@/models/course";

const FolderCards = ({ course }: { course: Course }) => (
  <Link href={`/courses/${course.id}`} key={course.id} className="block">
    <div className="bg-white-default rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-primary-light hover:text-white transition-all group">
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full ">
          <div className="flex justify-between items-center group-hover:text-white-default">
            <h4 className="text-lg font-semibold text-primary group-hover:text-white-default uppercase">
              {separateNameNum(course.section.course.code)}
            </h4>
            <FolderIcon className="text-primary h-6 w-6 group-hover:text-white-default" />
          </div>
          <p className="text-gray-600 font-medium group-hover:text-secondary-lightGray">
            {course.section.course.name}
          </p>
        </div>
      </div>
    </div>
  </Link>
);
export default FolderCards;
