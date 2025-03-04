/*
  Warnings:

  - You are about to drop the column `lead` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_lead_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "lead",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "leadId" TEXT,
ADD COLUMN     "usersId" TEXT;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
