import { FastifyInstance } from 'fastify'
import { upload } from './upload'
import { confirm } from './confirm'

export const routes = async (app: FastifyInstance) => {
  app.post('/upload', upload)

  app.post('/confirm', confirm)
}
