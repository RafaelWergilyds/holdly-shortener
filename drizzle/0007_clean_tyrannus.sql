CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT '019ff247-c39d-7c95-802e-e206f9da8f50' NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "shorten_url" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "shorten_url" ADD CONSTRAINT "shorten_url_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;