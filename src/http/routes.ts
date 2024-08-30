import { FastifyInstance } from 'fastify'
import { upload } from './upload'

export const routes = async (app: FastifyInstance) => {
  app.post('/upload', upload)
}
