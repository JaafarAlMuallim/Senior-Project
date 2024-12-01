import { UserCircle } from "lucide-react";
import { add } from "date-fns";
import { separateNameNum } from "@/lib/utils";
import Session from "@/models/session";

const TutorSession = ({ session }: { session: Session }) => {
  const time = session.date.toISOString().split("T")[1].substring(0, 5);
  const date = session.date.toISOString().split("T")[0];
  const endTime = add(session.date, { hours: 1 })
    .toISOString()
    .split("T")[1]
    .substring(0, 5);

  return (
    <div
      key={session.id}
      className="bg-white-default rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-primary-light hover:text-white transition-all group"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-primary group-hover:text-white-default uppercase">
              {separateNameNum(session.course.code)}
            </h4>
            <UserCircle className="text-primary h-6 w-6 group-hover:text-white-default" />
          </div>
          <p className="text-gray-600 font-medium group-hover:text-white-alt">
            {time} - {endTime}
          </p>
          <p className="text-gray-500 text-sm group-hover:text-white-alt">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TutorSession;
