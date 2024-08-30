import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUploadMeasureUseCase } from './factories/upload'

export const upload = async (req: FastifyRequest, reply: FastifyReply) => {
  const uploadMeasureBodySchema = z.object({
    customer_code: z.string({ required_error: 'Código de cliente inválido' }),
    image: z.string({ required_error: 'Imagem não fornecida' }).base64({
      message: 'Imagem inválida',
    }),
    measure_type: z
      .string()
      .transform((value) => value.toUpperCase())
      .refine((val) => ['WATER', 'GAS'].includes(val), {
        message: 'Tipo de medição não permitida',
      }),
    measure_datetime: z
      .string({ required_error: 'Data da medição não fornecida' })
      .datetime({ message: 'Data da medição inválida' }),
  })

  const { image, customer_code, measure_datetime, measure_type } =
    uploadMeasureBodySchema.parse(req.body)

  const uploadMeasureUseCase = makeUploadMeasureUseCase()

  const result = await uploadMeasureUseCase.execute({
    customer_code,
    image,
    measure_datetime: new Date(measure_datetime),
    measure_type: measure_type as 'WATER' | 'GAS',
    base_url: req.protocol + '://' + req.hostname,
  })

  return reply.send(result)
}
