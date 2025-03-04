/*
  Warnings:

  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.
  - The `status` column on the `Tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `lead` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PROJECT_STATUS" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TASK_STATUS" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "userId",
ADD COLUMN     "lead" TEXT NOT NULL,
ADD COLUMN     "status" "PROJECT_STATUS" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "status",
ADD COLUMN     "status" "TASK_STATUS" NOT NULL DEFAULT 'OPEN';

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_lead_fkey" FOREIGN KEY ("lead") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
