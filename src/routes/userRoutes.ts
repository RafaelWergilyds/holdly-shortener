import { FastifyInstance } from 'fastify'
import { UserController } from '../controller/userController.ts'
import { AuthController } from '../controller/authController.ts'
import { authMiddleware } from '../middleware/authMiddleware.ts'

const userController = new UserController()
const authController = new AuthController()

export async function useRoutes(app: FastifyInstance) {
    app.post('/auth', authController.login)
    app.post('/users', userController.createUser)
    app.get('/users', { preHandler: [authMiddleware] }, userController.findAllUsers)
    app.get('/users/:id', { preHandler: [authMiddleware] }, userController.findUserById)
}
