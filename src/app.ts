import fastify, { FastifyError } from 'fastify'
import fjwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { routes } from './routes/routes.ts'
import { AppError } from './errors.ts'
import { env } from './env.ts'

const app = fastify({ logger: true })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fjwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRATION,
  },
})

app.register(rateLimit, { global: false })

app.setErrorHandler<FastifyError>((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ error: error.message })
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      error: 'Validation failed',
      issues: error.validation.map((issue) => {
        const path = issue.instancePath.split('/').filter(Boolean)
        return { field: [error.validationContext, ...path].join('.'), message: issue.message }
      }),
    })
  }

  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send({ error: error.message })
  }

  request.log.error(error)
  return reply.status(500).send({ error: 'Internal server error' })
})

app.register(routes, { prefix: '/api' })

export default app
