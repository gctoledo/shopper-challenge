import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeConfirmMeasureUseCase } from './factories/confirm'

export const confirm = async (req: FastifyRequest, reply: FastifyReply) => {
  const confirmMeasureBodySchema = z.object({
    measure_uuid: z.string(),
    confirmed_value: z.coerce.number(),
  })

  const { confirmed_value, measure_uuid } = confirmMeasureBodySchema.parse(
    req.body,
  )

  const confirmMeasureUseCase = makeConfirmMeasureUseCase()

  await confirmMeasureUseCase.execute({
    id: measure_uuid,
    value: confirmed_value,
  })

  reply.send({ success: true })
}
