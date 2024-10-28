import {
  Category,
  PrismaClient as PostgresClient,
} from "@prisma/postgres/client";
import { PrismaClient as MongoClient } from "@prisma/mongo/client";

// https://registrar.kfupm.edu.sa/courses-classes/course-offering1/
import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

const postgres = new PostgresClient();
const mongo = new MongoClient();

type CourseData = {
  name: string;
  code: string;
};
type SectionData = {
  title: string;
  instructor: string;
  recurrence: string;
  // startTime: Date;
  // endTime: Date;
  time: string;
  location: string;
};

// const main = async () => {
//   // Launch the browser and open a new blank page
//
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//
//   // Navigate the page to a URL.
//   await page.goto(
//     "https://registrar.kfupm.edu.sa/courses-classes/course-offering1/",
//   );
//
//   // get dropdown values
//   await page.select("#term_code", "202410");
//   const deptCodes = await page.evaluate(() => {
//     const select = document.querySelector("#dept_code") as HTMLSelectElement;
//     return Array.from(select.options).map((option) => option.value);
//   });
//   const codes = deptCodes.filter((code) => code !== "select");
//   for (let i = 29; i < codes.length; i++) {
//     await page.select("#dept_code", codes[i]);
//     await page.waitForSelector("div > #data-table");
//     const data = await page.evaluate(() => {
//       const transformCode = (code: string) => {
//         return code.split("-")[0].split(" ").join("").toLowerCase();
//       };
//
//       const parseTimeToDates = (time: string) => {
//         const [start, end] = time.split("-");
//         const baseDate = "2024-01-01";
//         const startTime = start.substring(0, 2) + ":" + start.substring(2);
//         const endTime = end.substring(0, 2) + ":" + end.substring(2);
//         return {
//           startTime: new Date(baseDate + "T" + startTime),
//           endTime: new Date(baseDate + "T" + endTime),
//         };
//       };
//       const trs = Array.from(document.querySelectorAll("div div table tr"));
//       const coursesData: CourseData[] = [];
//       const data: SectionData[] = [];
//       for (let i = 1; i < trs.length; i++) {
//         const tds = trs[i].querySelectorAll("td");
//         if (tds[0].innerText === "Course-Code") {
//           continue;
//         }
//         // const parsedTime = parseTimeToDates(tds[6].innerText);
//         const parsedTime = tds[6].innerText;
//         const alreadyExists = coursesData.find(
//           (course) => course.code === transformCode(tds[0].innerText),
//         );
//         if (!alreadyExists) {
//           coursesData.push({
//             name: tds[3]?.innerText || "",
//             code: transformCode(tds[0].innerText),
//           });
//         }
//
//         data.push({
//           title: tds[0]?.innerText || "",
//           instructor: tds[4]?.innerText || "",
//           recurrence: tds[5]?.innerText || "",
//           // startTime: parsedTime.startTime,
//           // endTime: parsedTime.endTime,
//           time: parsedTime || "",
//           location: tds[7]?.innerText || "",
//         });
//       }
//       return { courses: coursesData, sections: data };
//     });
//     const course = await postgres.course.create({
//       data: {
//         name: data.courses[0].name,
//         code: data.courses[0].code,
//       },
//     });
//     console.log("Created course");
//     const sections = data.sections.map((sectionData) => {
//       const start = sectionData.time.split("-")[0];
//       const end = sectionData.time.split("-")[1];
//       const baseDate = "2024-01-01";
//       const startTime = start
//         ? start.substring(0, 2) + ":" + start.substring(2)
//         : "00:00";
//       const endTime = end
//         ? end.substring(0, 2) + ":" + end.substring(2)
//         : "00:00";
//       return {
//         title: sectionData.title,
//         instructor: sectionData.instructor,
//         recurrence: sectionData.recurrence,
//         startTime: new Date(baseDate + "T" + startTime),
//         endTime: new Date(baseDate + "T" + endTime),
//         location: sectionData.location,
//         courseId: course.id,
//       };
//     });
//     await postgres.section.createMany({
//       data: sections,
//     });
//     console.log("Created sections");
//   }
//   await browser.close();
//   // for (const courseData of coursesData) {
//   //   const transformCode = (code: string) => {
//   //     return code.split("-")[0].split(" ").join("").toLowerCase();
//   //   };
//   //   const course = await postgres.course.create({
//   //     data: {
//   //       name: courseData.name,
//   //       code: courseData.code,
//   //     },
//   //   });
//   //   console.log("Created course");
//   //   for (const sectionData of data) {
//   //     if (course.code !== transformCode(sectionData.title.split("-")[0])) {
//   //       continue;
//   //     }
//   //     const section = await postgres.section.create({
//   //       data: {
//   //         title: sectionData.title,
//   //         instructor: sectionData.instructor,
//   //         recurrence: sectionData.recurrence,
//   //         startTime: sectionData.startTime,
//   //         endTime: sectionData.endTime,
//   //         location: sectionData.location,
//   //         courseId: course.id,
//   //       },
//   //     });
//   //     console.log("Created section");
//   //   }
//   // }
// };

const main = async () => {};
main()
  .then(() => {
    console.log("Seeded groups");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await postgres.$disconnect();
    await mongo.$disconnect();
  });
