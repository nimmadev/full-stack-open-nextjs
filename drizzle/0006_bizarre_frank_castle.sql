CREATE TABLE "reading_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"blog_id" integer,
	"read" boolean DEFAULT false NOT NULL
);
