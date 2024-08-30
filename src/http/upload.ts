import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUploadMeasureUseCase } from './factories/upload'

export const upload = async (req: FastifyRequest, reply: FastifyReply) => {
  const uploadMeasureBodySchema = z.object({
    customer_code: z.string(),
    image: z.string().base64(),
    measure_type: z.enum(['WATER', 'GAS']),
    measure_datetime: z.string().datetime(),
  })

  const { image, customer_code, measure_datetime, measure_type } =
    uploadMeasureBodySchema.parse(req.body)

  const uploadMeasureUseCase = makeUploadMeasureUseCase()

  const result = await uploadMeasureUseCase.execute({
    customer_code,
    image,
    measure_datetime: new Date(measure_datetime),
    measure_type,
    base_url: req.protocol + '://' + req.hostname,
  })

  reply.send(result)
}
