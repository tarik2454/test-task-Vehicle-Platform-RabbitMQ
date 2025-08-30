CREATE TABLE "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"make" varchar(255) DEFAULT 'Unknown' NOT NULL,
	"model" varchar(255) DEFAULT 'Unknown' NOT NULL,
	"year" integer,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
