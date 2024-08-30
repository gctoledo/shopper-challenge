import { FastifyInstance } from 'fastify'
import { upload } from './upload'
import { confirm } from './confirm'
import { search } from './search'

export const routes = async (app: FastifyInstance) => {
  app.get('/:customer_code/list', search)

  app.post('/upload', upload)

  app.post('/confirm', confirm)
}
