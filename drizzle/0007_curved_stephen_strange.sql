ALTER TABLE "reading_list" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reading_list" ALTER COLUMN "blog_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_user_blog_id" UNIQUE("user_id","blog_id");