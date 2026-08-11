import { FastifyInstance } from "fastify";
import { UrlController } from "../controller/urlController";
import { UserController } from "../controller/userController";

const urlController = new UrlController()
const userController = new UserController()

export async function routes(app: FastifyInstance) {
    app.post("/shorten/:userId", urlController.createUrl)
    app.get("/", urlController.findAllUrls)
    app.get("/users/:userId/urls", urlController.findAllUrlsByUserId)
    app.get("/:code", urlController.redirectUrl)
    app.get("/users", userController.findAllUsers)
    app.post("/users", userController.createUser)
    app.get("/users/:id", userController.findUserById)
}