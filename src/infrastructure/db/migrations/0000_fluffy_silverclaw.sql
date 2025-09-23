CREATE TABLE "cars" (
	"license_plate" varchar PRIMARY KEY NOT NULL,
	"reference" varchar(100) NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"mileage" integer NOT NULL,
	"price" integer NOT NULL,
	"color" varchar(50) NOT NULL,
	"transmission" varchar(50) NOT NULL,
	"fuel_type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"images" text[] NOT NULL,
	"status" varchar(50) NOT NULL,
	"added_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" varchar NOT NULL,
	"temporary_password" boolean DEFAULT true NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" varchar(50) NOT NULL,
	"opening_time" time NOT NULL,
	"closing_time" time NOT NULL,
	"status" varchar(50) NOT NULL,
	"added_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_added_by_users_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_added_by_users_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;