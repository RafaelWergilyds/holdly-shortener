ALTER TABLE "shorten_url" DROP CONSTRAINT "shorten_url_short_url_unique";--> statement-breakpoint
ALTER TABLE "shorten_url" ALTER COLUMN "id" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "shorten_url" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "shorten_url" DROP COLUMN "short_url";