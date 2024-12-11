export const USERS = [
  {
    id: "12345",
    email: "example1@gmail.com",
    name: "Ahmed Abdullah",
    date: "2024/12/06",
  },
  {
    id: "12445",
    email: "example2@gmail.com",
    name: "Saed Wael",
    date: "2024/12/06",
  },
  {
    id: "15345",
    email: "example3@gmail.com",
    name: "Ali Hassan",
    date: "2024/12/06",
  },
  {
    id: "18345",
    email: "example4@gmail.com",
    name: "Ahmed Mohammed",
    date: "2024/12/06",
  },
];

export const MESSAGES = [
  { date: "2024-11-01", groups: 30, ai: 10 },
  { date: "2024-11-02", groups: 45, ai: 20 },
  { date: "2024-11-03", groups: 50, ai: 15 },
  { date: "2024-11-04", groups: 60, ai: 18 },
  { date: "2024-11-05", groups: 35, ai: 20 },
  { date: "2024-11-06", groups: 50, ai: 25 },
  { date: "2024-11-07", groups: 80, ai: 40 },
  { date: "2024-11-08", groups: 55, ai: 30 },
  { date: "2024-11-09", groups: 60, ai: 25 },
  { date: "2024-11-10", groups: 60, ai: 48 },
  { date: "2024-11-11", groups: 35, ai: 20 },
  { date: "2024-11-12", groups: 50, ai: 25 },
];

export const GROUPS = [
  {
    id: "12345",
    name: "ICS 485",
    courseId: "23945",
    date: "2024/12/06",
    messageCount: 10,
  },
  {
    id: "12445",
    name: "IAS 322",
    courseId: "56070",
    date: "2024/12/06",
    messageCount: 20,
  },
  {
    id: "15345",
    name: "ISE 291",
    courseId: "55966",
    date: "2024/12/06",
    messageCount: 15,
  },
  {
    id: "18345",
    name: "SWE 316",
    courseId: "15967",
    date: "2024/12/06",
    messageCount: 18,
  },
];

export const REPORTS = [
  {
    id: "12345",
    title: "Forgot password",
    category: "Security",
    date: "2024/12/06",
    description: "Password forgotten and email lost.",
    status: "open",
  },
  {
    id: "12445",
    title: "University integration",
    category: "Suggestion",
    date: "2024/12/06",
    description: "Suggestion: why not to integrate the app with KFUPM portal.",
    status: "closed",
  },
  {
    id: "15345",
    title: "App crashed",
    category: "Bug",
    date: "2024/12/06",
    description:
      "I just encountered an issue with the app that I wanted to report.",
    status: "open",
  },
  {
    id: "18345",
    title: "Forgot password",
    category: "Security",
    date: "2024/12/06",
    description: "Password forgotten and email lost.",
    status: "closed",
  },
];

export const UNIVERSITIES = [
  {
    label: "KFUPM",
    value: "kfupm",
  },
  {
    label: "KAUST",
    value: "kaust",
  },
  {
    label: "KFSH",
    value: "kfsh",
  },
  {
    label: "KACST",
    value: "kacst",
  },
  {
    label: "KSU",
    value: "ksu",
  },
];

export const MAJORS = [
  {
    label: "Computer Science",
    value: "cs",
  },
  {
    label: "Electrical Engineering",
    value: "ee",
  },
  {
    label: "Mechanical Engineering",
    value: "me",
  },
  {
    label: "Civil Engineering",
    value: "ce",
  },
  {
    label: "Chemical Engineering",
    value: "che",
  },
  {
    label: "Petroleum Engineering",
    value: "pe",
  },
  {
    label: "Industrial Engineering",
    value: "ie",
  },
  {
    label: "Systems Engineering",
    value: "se",
  },
  {
    label: "Business Administration",
    value: "ba",
  },
  {
    label: "Finance",
    value: "fin",
  },
  {
    label: "Accounting",
    value: "acc",
  },
  {
    label: "Marketing",
    value: "mkt",
  },
  {
    label: "Management",
    value: "mgmt",
  },
  {
    label: "Human Resources",
    value: "hr",
  },
  {
    label: "Supply Chain",
    value: "scm",
  },
  {
    label: "Operations Management",
    value: "om",
  },
  {
    label: "Information Systems",
    value: "is",
  },
  {
    label: "Software Engineering",
    value: "swe",
  },
  {
    label: "Computer Engineering",
    value: "coe",
  },
  {
    label: "Cybersecurity",
    value: "cys",
  },
  {
    label: "Data Science",
    value: "ds",
  },
  {
    label: "Artificial Intelligence",
    value: "ai",
  },
  {
    label: "Machine Learning",
    value: "ml",
  },
];

export const STANDINGS = [
  {
    label: "Freshman",
    value: "freshman",
  },
  {
    label: "Sophomore",
    value: "sophomore",
  },
  {
    label: "Junior",
    value: "junior",
  },
  {
    label: "Senior",
    value: "senior",
  },
  {
    label: "Graduate",
    value: "graduate",
  },
  {
    label: "Post-Graduate",
    value: "post-graduate",
  },
  {
    label: "PhD",
    value: "phd",
  },
  {
    label: "Post-Doctorate",
    value: "post-doctorate",
  },
  {
    label: "Faculty",
    value: "faculty",
  },
  {
    label: "Staff",
    value: "staff",
  },
  {
    label: "Alumni",
    value: "alumni",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const COURSES = [
  {
    label: "Big Data Analytics",
    value: "ics474",
    dept: "cs",
  },
  {
    label: "Quality Engineering",
    value: "swe439",
    dept: "swe",
  },
  {
    label: "Software Design",
    value: "swe316",
    dept: "swe",
  },
  {
    label: "Software Testing",
    value: "swe326",
    dept: "swe",
  },
  {
    label: "Software Architecture",
    value: "swe416",
    dept: "swe",
  },
  {
    label: "Software Project Management",
    value: "swe387",
    dept: "swe",
  },
];

export const AVAILABLE_TIMES = [
  {
    date: new Date("2022-10-02"),
    time: "10:00 AM",
    duration: "2",
  },
  {
    date: new Date("2022-10-04"),
    time: "10:00 AM",
    duration: "2",
  },
  {
    date: new Date("2022-10-06"),
    time: "10:00 AM",
    duration: "2",
  },
  {
    date: new Date("2022-10-07"),
    time: "10:00 AM",
    duration: "2",
  },

  {
    date: new Date("2022-10-07"),
    time: "14:00 PM",
    duration: "2",
  },
  {
    date: new Date("2022-10-10"),
    time: "10:00 AM",
    duration: "1",
  },
  {
    date: new Date("2022-10-11"),
    time: "10:00 AM",
    duration: "1",
  },
  {
    date: new Date("2022-10-12"),
    time: "10:00 AM",
    duration: "1",
  },
];

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
export const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
];
export const EVENTS = [
  {
    day: "Sunday",
    classes: [
      {
        id: "1",
        title: "MATH 101",
        section: "06",
        start: "09:00",
        end: "9:50",
        location: "6-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "2",
        title: "PHYS 101",
        section: "06",
        start: "10:00",
        end: "10:50",
        location: "6-235",
        instructor: "A GHANNAM",
      },
    ],
  },
  {
    day: "Monday",
    classes: [
      {
        id: "1",
        title: "MATH 101",
        section: "06",
        start: "09:00",
        end: "09:50",
        location: "6-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "2",
        title: "PHYS 101",
        section: "06",
        start: "10:00",
        end: "10:50",
        location: "6-235",
        instructor: "A GHANNAM",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        id: "3",
        title: "MATH 101",
        section: "06",
        start: "09:00",
        end: "09:50",
        location: "6-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "4",
        title: "PHYS 101",
        section: "06",
        start: "10:00",
        end: "10:50",
        location: "6-235",
        instructor: "A GHANNAM",
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        id: "1",
        title: "MATH 101",
        section: "06",
        start: "09:00",
        end: "09:50",
        location: "6-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "2",
        title: "PHYS 101",
        section: "57",
        start: "10:00",
        end: "13:30",
        location: "6-235",
        instructor: "A GHANNAM",
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        id: "1",
        title: "MATH 101",
        section: "06",
        start: "09:00",
        end: "09:50",
        location: "6-135",
        instructor: "TAMEM AL-SHORMAN",
      },
      {
        id: "2",
        title: "PHYS 101",
        section: "06",
        start: "10:00",
        end: "10:50",
        location: "6-235",
        instructor: "A GHANNAM",
      },
    ],
  },
];

export const DEPTS = [
  { value: "cs", label: "Computer Science" },
  { value: "math", label: "Mathematics" },
  { value: "eng", label: "Engineering" },
];

export const TYPES = [
  { value: "lecture", label: "Lecture" },
  { value: "lab", label: "Laboratory" },
  { value: "seminar", label: "Seminar" },
];

export const INSTRUCTORS = ["Dr. Smith", "Prof. Johnson", "Dr. Williams"];

export const DAYS = {
  name: "Days",
  options: [
    {
      label: "Sunday",
      value: "U",
    },
    {
      label: "Monday",
      value: "M",
    },
    {
      label: "Tuesday",
      value: "T",
    },
    {
      label: "Wednesday",
      value: "W",
    },
    {
      label: "Thursday",
      value: "R",
    },
    {
      label: "Friday",
      value: "F",
    },
    {
      label: "Saturday",
      value: "S",
    },
  ],
};

export const TIMES = ["08:00", "10:00", "12:00", "14:00", "16:00"];
export const LOCATIONS = ["Room 101", "Room 102", "Lab A", "Lab B"];

export const CATEGORIES = {
  name: "Category",
  options: [
    {
      id: 1,
      title: "Slides",
      type: "slide",
      value: "SLIDE",
    },
    {
      id: 2,
      title: "Assignments",
      type: "hw",
      value: "HW",
    },
    {
      id: 3,
      title: "Quizzes",
      type: "quiz",
      value: "QUIZ",
    },
    {
      id: 4,
      title: "Exams",
      type: "exam",
      value: "EXAM",
    },
    {
      id: 5,
      title: "Pictures",
      type: "picture",
      value: "IMG",
    },
    {
      id: 6,
      title: "Others",
      type: "other",
      value: "OTHER",
    },
  ],
};
