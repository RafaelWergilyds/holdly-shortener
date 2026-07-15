ALTER TABLE "shorten_url" RENAME COLUMN "shortUrl" TO "short_url";--> statement-breakpoint
ALTER TABLE "shorten_url" DROP CONSTRAINT "shorten_url_shortUrl_unique";--> statement-breakpoint
ALTER TABLE "shorten_url" ADD CONSTRAINT "shorten_url_short_url_unique" UNIQUE("short_url");