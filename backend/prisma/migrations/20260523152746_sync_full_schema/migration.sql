/*
  Warnings:

  - Added the required column `accreditation` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courses` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `established` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placements` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "accreditation" TEXT NOT NULL,
ADD COLUMN     "courses" JSONB NOT NULL,
ADD COLUMN     "established" INTEGER NOT NULL,
ADD COLUMN     "placements" JSONB NOT NULL,
ADD COLUMN     "reviews" JSONB NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SavedCollege" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedCollege_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedCollege_userId_collegeId_key" ON "SavedCollege"("userId", "collegeId");

-- AddForeignKey
ALTER TABLE "SavedCollege" ADD CONSTRAINT "SavedCollege_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCollege" ADD CONSTRAINT "SavedCollege_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;
