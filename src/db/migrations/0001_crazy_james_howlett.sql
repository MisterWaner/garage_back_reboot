CREATE TYPE "public"."car_status" AS ENUM('available', 'sold', 'reserved');--> statement-breakpoint
CREATE TYPE "public"."fuel_type" AS ENUM('petrol', 'diesel', 'electric', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('manual', 'automatic');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "cars" RENAME COLUMN "fuel_type" TO "fuelType";--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "transmission" SET DATA TYPE "public"."transmission" USING "transmission"::"public"."transmission";--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "transmission" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "status" SET DATA TYPE "public"."car_status" USING "status"::"public"."car_status";--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "status" SET DATA TYPE "public"."review_status" USING "status"::"public"."review_status";--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "schedules" ADD COLUMN "status" "status";