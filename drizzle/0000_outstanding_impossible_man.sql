CREATE TABLE "shorten_url" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(6) NOT NULL,
	"url" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shorten_url_code_unique" UNIQUE("code"),
	CONSTRAINT "shorten_url_url_unique" UNIQUE("url")
);
