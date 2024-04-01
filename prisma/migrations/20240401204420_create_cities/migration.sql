/*
  Warnings:

  - You are about to drop the column `city` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_name` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_name` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "city",
ADD COLUMN     "city_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "city_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_city_name_key" ON "cities"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_city_name_fkey" FOREIGN KEY ("city_name") REFERENCES "cities"("city_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_city_name_fkey" FOREIGN KEY ("city_name") REFERENCES "cities"("city_name") ON DELETE RESTRICT ON UPDATE CASCADE;
