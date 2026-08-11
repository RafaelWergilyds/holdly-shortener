CREATE INDEX "user_id_idx" ON "shorten_url" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "shorten_url" ADD CONSTRAINT "url_user_unique" UNIQUE("url","user_id");