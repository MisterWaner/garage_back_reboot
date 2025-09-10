ALTER TABLE "cars" RENAME COLUMN "fuelType" TO "fuel_type";--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "transmission" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "transmission" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "schedules" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "schedules" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."car_status";--> statement-breakpoint
DROP TYPE "public"."fuel_type";--> statement-breakpoint
DROP TYPE "public"."transmission";--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
DROP TYPE "public"."review_status";