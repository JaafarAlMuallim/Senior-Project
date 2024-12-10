import { PrismaClient as PostgresClient } from "@prisma/postgres/client";
import { PrismaClient as MongoClient } from "@prisma/mongo/client";

// https://registrar.kfupm.edu.sa/courses-classes/course-offering1/
import puppeteer from "puppeteer";
import preprocess from "../src/lib/preprocessing";
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

const main = async () => {
  // Launch the browser and open a new blank page

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(
    "https://registrar.kfupm.edu.sa/courses-classes/course-offering1/"
  );

  // get dropdown values
  await page.select("#term_code", "202410");
  const deptCodes = await page.evaluate(() => {
    const select = document.querySelector("#dept_code") as HTMLSelectElement;
    return Array.from(select.options).map((option) => option.value);
  });
  const codes = deptCodes.filter((code) => code !== "select");
  // NEXT ITERATION 12 - 18
  const i = 17;
  if (i === 17) {
    console.log(`Starting index = ${i} Code = ${codes[i]}`);
    await page.select("#dept_code", codes[i]);
    await page.waitForSelector("div > #data-table");
    const data = await page.evaluate(() => {
      const transformCode = (code: string) => {
        return code.split("-")[0].split(" ").join("").toLowerCase();
      };

      // const parseTimeToDates = (time: string) => {
      //   const [start, end] = time.split("-");
      //   const baseDate = "2024-01-01";
      //   const startTime = start.substring(0, 2) + ":" + start.substring(2);
      //   const endTime = end.substring(0, 2) + ":" + end.substring(2);
      //   return {
      //     startTime: new Date(baseDate + "T" + startTime),
      //     endTime: new Date(baseDate + "T" + endTime),
      //   };
      // };
      const trs = Array.from(document.querySelectorAll("div div table tr"));
      const coursesData: CourseData[] = [];
      const data: SectionData[] = [];
      for (let i = 1; i < trs.length; i++) {
        const tds = trs[i].querySelectorAll("td");
        if (tds[0].innerText === "Course-Code") {
          continue;
        }
        // const parsedTime = parseTimeToDates(tds[6].innerText);
        const parsedTime = tds[6].innerText;
        const alreadyExists = coursesData.find(
          (course) => course.code === transformCode(tds[0].innerText)
        );
        console.log(!!alreadyExists ? alreadyExists.code : "Not found");
        if (!alreadyExists) {
          coursesData.push({
            name: tds[3]?.innerText || "",
            code: transformCode(tds[0].innerText),
          });
        }

        data.push({
          title: tds[0]?.innerText || "",
          instructor: tds[4]?.innerText || "",
          recurrence: tds[5]?.innerText || "",
          // startTime: parsedTime.startTime,
          // endTime: parsedTime.endTime,
          time: parsedTime || "",
          location: tds[7]?.innerText || "",
        });
      }
      return { courses: coursesData, sections: data };
    });

    await Promise.all(
      data.courses.map(async (c) => {
        const course = await postgres.course.create({
          data: {
            name: c.name,
            code: c.code,
          },
        });
        console.log(`Created ${c.name}`);
        const courseList = data.sections
          .filter((sectionData) => {
            return (
              course.code ===
              sectionData.title.split("-")[0].split(" ").join("").toLowerCase()
            );
          })
          .map((sectionData) => {
            const start = sectionData.time.split("-")[0];
            const end = sectionData.time.split("-")[1];
            const baseDate = "2024-01-01";
            const startTime = start
              ? start.substring(0, 2) + ":" + start.substring(2)
              : "00:00";
            const endTime = end
              ? end.substring(0, 2) + ":" + end.substring(2)
              : "00:00";
            const section = {
              title: sectionData.title,
              instructor: sectionData.instructor,
              recurrence: sectionData.recurrence,
              startTime: new Date(baseDate + "T" + startTime),
              endTime: new Date(baseDate + "T" + endTime),
              location: sectionData.location,
              courseId: course.id,
            };
            return section;
          });

        await postgres.section.createMany({
          data: courseList,
        });
        console.log("Created sections");
      })
    );
  }
  await browser.close();
};

// const main = async () => {
// const data = {
//   questions:
//     '```json\n[\n  {\n    "question": "Q1. Which of the following is the best definition of energy?",\n    "options": [\n      "A) The capacity to do work or transfer heat.",\n      "B) The energy that results from motion.",\n      "C) Energy associated with the random motion of atoms and molecules.",\n      "D) Potential energy that results from the interaction of charged particles.",\n      "E) Energy stored within the structural units of chemical substances."\n    ],\n    "answer": "A) The capacity to do work or transfer heat."\n  },\n  {\n    "question": "Q2.  A system absorbs 250 J of heat and does 100 J of work on its surroundings. What is the change in internal energy (ΔU) of the system?",\n    "options": [\n      "A) -350 J",\n      "B) 150 J",\n      "C) 350 J",\n      "D) -150 J",\n      "E) 0 J"\n    ],\n    "answer": "B) 150 J"\n  },\n  {\n    "question": "Q3. Which of the following are state functions?",\n    "options": [\n      "A) Heat and work",\n      "B) Internal energy and enthalpy",\n      "C) Heat only",\n      "D) Work only",\n      "E) Enthalpy only"\n    ],\n    "answer": "B) Internal energy and enthalpy"\n  },\n  {\n    "question": "Q4.  The heat exchanged at constant pressure is equal to:",\n    "options": [\n      "A) ΔU",\n      "B) w",\n      "C) q",\n      "D) ΔH",\n      "E)  ΔG"\n    ],\n    "answer": "D) ΔH"\n  },\n  {\n    "question": "Q5.  If you reverse a chemical equation, what happens to the sign of ΔH?",\n    "options": [\n      "A) It stays the same.",\n      "B) It becomes zero.",\n      "C) It changes sign.",\n      "D) It doubles.",\n      "E) It is halved."\n    ],\n    "answer": "C) It changes sign."\n  },\n  {\n    "question": "Q6. A reaction has ΔH = -100 kJ/mol. This means the reaction is:",\n    "options": [\n      "A) Endothermic and absorbs heat.",\n      "B) Exothermic and absorbs heat.",\n      "C) Endothermic and releases heat.",\n      "D) Exothermic and releases heat.",\n      "E) Neither endothermic nor exothermic."\n    ],\n    "answer": "D) Exothermic and releases heat."\n  },\n  {\n    "question": "Q7. The specific heat of a substance is the amount of heat required to:",\n    "options": [\n      "A) Raise the temperature of 1 g of the substance by 1°C.",\n      "B) Raise the temperature of 1 kg of the substance by 1°C.",\n      "C) Raise the temperature of 1 mol of the substance by 1°C.",\n      "D) Raise the temperature of any mass of the substance by 1°C.",\n      "E) Lower the temperature of 1 g of the substance by 1°C."\n    ],\n    "answer": "A) Raise the temperature of 1 g of the substance by 1°C."\n  },\n  {\n    "question": "Q8.  In a constant-pressure calorimeter, the heat absorbed by the calorimeter itself is:",\n    "options": [\n      "A) Always positive.",\n      "B) Always negative.",\n      "C) Usually ignored.",\n      "D) Equal to the heat released by the reaction.",\n      "E) Equal to the heat absorbed by the reaction."\n    ],\n    "answer": "C) Usually ignored."\n  },\n  {\n    "question": "Q9.  Hess\'s Law states that the enthalpy change for a reaction is:",\n    "options": [\n      "A) Independent of the path taken.",\n      "B) Always positive.",\n      "C) Always negative.",\n      "D) Dependent on the number of steps.",\n      "E) Equal to the heat capacity of the calorimeter."\n    ],\n    "answer": "A) Independent of the path taken."\n  },\n  {\n    "question": "Q10. The standard enthalpy of formation (ΔH°f) of an element in its standard state is:",\n    "options": [\n      "A) Always positive.",\n      "B) Always negative.",\n      "C) Zero.",\n      "D) Dependent on the temperature.",\n      "E) Dependent on the pressure."\n    ],\n    "answer": "C) Zero."\n  },\n  {\n    "question": "Q11.  What is the standard enthalpy change for the reaction 2A(g) + B(g) → C(g) given the following standard enthalpies of formation: ΔH°f [A(g)] = 200 kJ/mol, ΔH°f [B(g)] = 300 kJ/mol, ΔH°f [C(g)] = 100 kJ/mol?",\n    "options": [\n      "A) 600 kJ/mol",\n      "B) -600 kJ/mol",\n      "C) -200 kJ/mol",\n      "D) 200 kJ/mol",\n      "E) -100 kJ/mol"\n    ],\n    "answer": "C) -200 kJ/mol"\n  }\n]\n```',
// };
// const processedData = preprocess(data.questions);
// const quiz = await postgres.quiz.create({
//   data: {
//     courseId: "cm177rnwp0000119qsarlyxia",
//   },
// });
// const questions = processedData.map((question) => {
//   return {
//     question: question.question,
//     options: question.options,
//     correctAnswer: question.answer,
//     quizId: quiz.id,
//   };
// });
// await postgres.question.createMany({
//   data: questions,
// });
// console.log("Created questions");
// console.log("Created quiz");
// };
main()
  .then(() => {
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
