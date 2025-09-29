/*
  Warnings:

  - Added the required column `duration` to the `Webinar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Webinar" ADD COLUMN     "duration" INTEGER NOT NULL;
