import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchMeasureUseCase } from './factories/search'

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const uploadMeasureParamsSchema = z.object({
    customer_code: z.string({ required_error: 'Código de cliente inválido' }),
  })
  const uploadMeasureQueryParamsSchema = z.object({
    measure_type: z
      .string()
      .transform((value) => value.toUpperCase())
      .refine((val) => ['WATER', 'GAS'].includes(val), {
        message: 'Tipo de medição não permitida',
      })
      .optional(),
  })

  const { customer_code } = uploadMeasureParamsSchema.parse(req.params)
  const { measure_type } = uploadMeasureQueryParamsSchema.parse(req.query)

  const searchMeasureUseCase = makeSearchMeasureUseCase()

  const { measures } = await searchMeasureUseCase.execute({
    customer_code,
    measure_type: measure_type as 'WATER' | 'GAS',
  })

  return reply.send({
    customer_code,
    measures,
  })
}
