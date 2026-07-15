ALTER TABLE "shorten_url" RENAME COLUMN "code" TO "shortUrl";--> statement-breakpoint
ALTER TABLE "shorten_url" DROP CONSTRAINT "shorten_url_code_unique";--> statement-breakpoint
ALTER TABLE "shorten_url" ADD CONSTRAINT "shorten_url_shortUrl_unique" UNIQUE("shortUrl");