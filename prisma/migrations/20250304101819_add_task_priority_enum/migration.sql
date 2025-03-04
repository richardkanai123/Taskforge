/*
  Warnings:

  - The `priority` column on the `Tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PRIORITY" AS ENUM ('L1', 'L2', 'L3', 'L4', 'L5');

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "priority",
ADD COLUMN     "priority" "PRIORITY" NOT NULL DEFAULT 'L1';
