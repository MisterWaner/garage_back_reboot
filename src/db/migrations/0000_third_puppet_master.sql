CREATE TYPE "public"."role" AS ENUM('admin', 'employee');--> statement-breakpoint
CREATE TABLE "cars" (
	"immatriculation" varchar PRIMARY KEY NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"mileage" integer NOT NULL,
	"price" integer NOT NULL,
	"color" varchar(50) NOT NULL,
	"power" integer NOT NULL,
	"transmission" varchar(50) NOT NULL,
	"fuel_type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"images" text[] NOT NULL,
	"status" varchar(50) NOT NULL,
	"added_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"firstname" varchar(100) NOT NULL,
	"lastname" varchar(100) NOT NULL,
	"role" "role",
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" varchar(50) NOT NULL,
	"opening_time" time NOT NULL,
	"closing_time" time NOT NULL,
	"added_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"comment" text NOT NULL,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;