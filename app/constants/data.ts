/**
   Here Should be the imports of images and icons and other data objects exporting them 
 */

const UNIVERSITIES = [
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

const MAJORS = [
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

const STANDINGS = [
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

const COURSES = [
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

const GRADES = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A",
    value: "A",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "C+",
    value: "C+",
  },
  {
    label: "C",
    value: "C",
  },
  {
    label: "D+",
    value: "D+",
  },
  {
    label: "D",
    value: "D",
  },
  {
    label: "F",
    value: "F",
  },
];
const AVAILABLE_TIMES = [
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

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const TIME_SLOTS = [
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
const EVENTS = [
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

export {
  UNIVERSITIES,
  MAJORS,
  STANDINGS,
  COURSES,
  GRADES,
  AVAILABLE_TIMES,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  EVENTS,
};
