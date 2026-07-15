import {FastifyInstance} from "fastify";
import { UrlController } from "../controller/UrlController";

const urlController = new UrlController()

export async function routes(app: FastifyInstance) {
    app.post("/shorten", urlController.createUrl)
    app.get("/", urlController.findAllUrls);
    app.get("/:code", urlController.redirectUrl)
}