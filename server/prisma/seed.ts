import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.section.create({
    data: {
      title: "ICS 474 - 01",
      courseId: "cm177rnwp0000119qsarlyxia",
      startTime: new Date("2024-01-01T10:00:00Z"),
      endTime: new Date("2024-01-01T11:15:00Z"),
      recurrence: "MW",
    },
  });

  await prisma.section.create({
    data: {
      title: "ICS 474 - 02",
      courseId: "cm177rnwp0000119qsarlyxia",
      startTime: new Date("2024-01-01T11:30:00Z"),
      endTime: new Date("2024-01-01T12:45:00Z"),
      recurrence: "MW",
    },
  });

  await prisma.section.create({
    data: {
      title: "ICS 474 - 03",
      courseId: "cm177rnwp0000119qsarlyxia",
      startTime: new Date("2024-01-01T13:00:00Z"),
      endTime: new Date("2024-01-01T14:15:00Z"),
      recurrence: "MW",
    },
  });
  console.log("Seeded sections");
}

async function seedRegistration() {
  await prisma.registration.create({
    data: {
      userId: "cm0zal1b00000ot97nezlmxdg",
      semester: "241",
      sectionId: "cm1ooz61l0001ivoprphb256v",
    },
  });
}

async function seedGroups() {
  const courses = await prisma.course.findMany();
  courses.forEach(async (course) => {
    await prisma.group.create({
      data: {
        name: course.code.toUpperCase(),
        courseId: course.id,
      },
    });
  });
  console.log("Seeded groups");
}

async function seedParticipants() {
  const registrations = await prisma.registration.findMany({
    include: {
      section: {
        include: {
          course: true,
        },
      },
    },
  });
  const groups = await prisma.group.findMany();

  const mapRegGroups = registrations.map((registration) => {
    const group = groups.find(
      (group) => group.courseId === registration.section.course.id,
    );
    return {
      userId: registration.userId,
      groupId: group?.id,
    };
  });
  console.log(mapRegGroups);

  mapRegGroups.forEach(async (regGroup) => {
    await prisma.participant.create({
      data: {
        userId: regGroup.userId!,
        groupId: regGroup.groupId!,
      },
    });
  });
  console.log("Seeded participants");
}

seedParticipants()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
