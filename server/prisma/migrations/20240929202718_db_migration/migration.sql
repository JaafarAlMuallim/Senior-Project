/*
  Warnings:

  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `CourseTutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseTutor" ADD COLUMN     "grade" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
