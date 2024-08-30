import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeConfirmMeasureUseCase } from './factories/confirm'

export const confirm = async (req: FastifyRequest, reply: FastifyReply) => {
  const confirmMeasureBodySchema = z.object({
    measure_uuid: z
      .string({ required_error: 'ID da medição é obrigatório' })
      .uuid({
        message: 'ID da medição é inválido',
      }),
    confirmed_value: z.coerce.number({
      required_error: 'Valor obrigatório',
      message: 'O valor deve ser um número válido',
    }),
  })

  const { confirmed_value, measure_uuid } = confirmMeasureBodySchema.parse(
    req.body,
  )

  const confirmMeasureUseCase = makeConfirmMeasureUseCase()

  await confirmMeasureUseCase.execute({
    id: measure_uuid,
    value: confirmed_value,
  })

  return reply.send({ success: true })
}
