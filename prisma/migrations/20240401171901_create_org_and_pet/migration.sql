-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DOG', 'CAT', 'BIRD', 'RODENT', 'REPTILE', 'OTHER');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('BABY', 'YOUNG', 'ADULT', 'SENIOR', 'OTHER');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'XLARGE', 'OTHER');

-- CreateEnum
CREATE TYPE "Stamina" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'OTHER');

-- CreateEnum
CREATE TYPE "Autonomy" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'OTHER');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'OTHER',
    "age" "Age" NOT NULL DEFAULT 'OTHER',
    "size" "Size" NOT NULL DEFAULT 'OTHER',
    "stamina" "Stamina" NOT NULL DEFAULT 'OTHER',
    "autonomy" "Autonomy" NOT NULL DEFAULT 'OTHER',
    "photos" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adopted_at" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
