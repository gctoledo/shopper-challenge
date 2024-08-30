import fastify from 'fastify'
import { routes } from './http/routes'
import path from 'node:path'
import fastifyStatic from '@fastify/static'
import { errorHandler } from './middlewares/error-handler'

const app = fastify()

app.register(fastifyStatic, {
  root: path.join(__dirname, 'temp'),
  prefix: '/public/',
})

app.register(routes)

app.setErrorHandler(errorHandler)

export default app
