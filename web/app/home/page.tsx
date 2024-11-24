import { Suspense } from "react";
import { FolderIcon, UserCircle } from "lucide-react";
import { add } from "date-fns";
import Link from "next/link";

interface Course {
  id: number;
  code: string;
  name: string;
  days: string[];
  time: string;
}

interface Session {
  id: number;
  date: string;
  course: {
    code: string;
  };
}

interface User {
  id: null | number;
  name: string;
}

interface OfflineStore {
  registrations: any[];
  user: {
    user: User;
  };
}

const HomePage = () => {
  const registrations: any[] = [];
  const user = {
    user: {
      id: 1,
      name: "Jaafar Al Muallim",
    },
  };

  const tutor = true;

  const userCourses = user?.user.id ? { data: registrations } : null;

  const sessions: Session[] = user?.user.id
    ? [
        {
          id: 1,
          date: "2024-02-14T14:00:00",
          course: {
            code: "SWE326",
          },
        },
        {
          id: 2,
          date: "2024-02-14T15:30:00",
          course: {
            code: "ICS321",
          },
        },
      ]
    : [];

  const mockCourses: Course[] = [
    {
      id: 1,
      code: "SWE326",
      name: "Software Testing",
      days: ["MON", "WED"],
      time: "10:00",
    },
    {
      id: 2,
      code: "ICS321",
      name: "Database Systems",
      days: ["SON", "TUE", "THU"],
      time: "13:00",
    },
    {
      id: 3,
      code: "MTH201",
      name: "Calculus III",
      days: ["SON", "TUE", "THU"],
      time: "08:30",
    },
  ];

  const today = new Date();
  const todayDay = today
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  const todaysCourses = mockCourses.filter((course) =>
    course.days.includes(todayDay),
  );

  const sortedCourses = [...todaysCourses].sort((a, b) =>
    a.time.localeCompare(b.time),
  );
  function separateFirstName(name: string | undefined): React.ReactNode {
    if (!name) return name;
    const names = name.split(" ");
    if (names.length === 0) return name;
    return names[0];
  }
  function separateNameNum(code: string | undefined): React.ReactNode {
    if (!code) return code;
    const match = code.match(/([A-Za-z]+)(\d+)/);
    if (!match) return code;
    const [_, letters, numbers] = match;
    return (
      <>
        {letters}
        <span className="text-primary group-hover:text-white">{numbers}</span>
      </>
    );
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Link href={`/courses/${course.id}`} key={course.id} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-primary-light hover:text-white transition-all group ">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full ">
            <div className="flex justify-between items-center group-hover:text-white">
              <h4 className="text-lg font-semibold text-primary group-hover:text-white">
                {separateNameNum(course.code)}
              </h4>
              <FolderIcon className="text-primary h-6 w-6 group-hover:text-white" />
            </div>
            <p className="text-gray-600 font-medium group-hover:text-secondary-lightGray">
              {course.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );

  const ScheduleItem = ({
    course,
    isLast,
  }: {
    course: Course;
    isLast: boolean;
  }) => (
    <div key={course.id} className="flex items-start gap-4">
      <div className="font-semibold text-lg w-20">{course.time}</div>
      <div className="flex-1 relative">
        <div
          className={`w-0.5 bg-blue-500 absolute ml-[-8px] ${isLast ? "h-full" : "h-full"}`}
        ></div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="font-medium">{separateNameNum(course.code)}</div>
          <div className="text-sm text-gray-500">{course.name}</div>
        </div>
      </div>
    </div>
  );

  const TutorSession = ({ session }: { session: Session }) => {
    const time = session.date.split("T")[1].substring(0, 5);
    const date = session.date.split("T")[0];
    const endTime = add(new Date(session.date), { minutes: 30 })
      .toISOString()
      .split("T")[1]
      .substring(0, 5);

    return (
      <div
        key={session.id}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:bg-primary-light hover:text-white transition-all group"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-primary group-hover:text-white">
                {separateNameNum(session.course.code)}
              </h4>
              <UserCircle className="text-primary h-6 w-6 group-hover:text-white" />
            </div>
            <p className="text-gray-600 font-medium group-hover:text-white">
              {time} - {endTime}
            </p>
            <p className="text-gray-500 text-sm group-hover:text-secondary-lightGray">
              {date}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Welcome, {separateFirstName(user?.user.name)}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            My Courses
          </h3>
          <Suspense fallback={<div>Loading courses...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </Suspense>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primary mb-4">Schedule</h3>
          <div className="text-sm text-gray-500">
            Today -{" "}
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="mt-4 space-y-6">
            {sortedCourses.map((course, index) => (
              <ScheduleItem
                key={course.id}
                course={course}
                isLast={index === sortedCourses.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {tutor && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Tutoring Sessions
          </h3>
          <Suspense fallback={<div>Loading sessions...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {sessions?.map((session) => (
                <TutorSession key={session.id} session={session} />
              ))}
            </div>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default HomePage;
