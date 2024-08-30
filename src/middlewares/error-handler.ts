import { InvalidImageFormatError } from '@/http/errors/invalid-image-format'
import { MeasureAlreadyConfirmedError } from '@/http/errors/measure-already-confirmed'
import { MeasureAlreadyExistsError } from '@/http/errors/measure-already-exists'
import { MeasureNotFoundError } from '@/http/errors/measure-not-found'
import { MeasuresNotFoundError } from '@/http/errors/measures-not-found'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export const errorHandler = async (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        err.issues.length > 1
          ? err.issues.map((e) => e.message)
          : err.issues[0].message,
    })
  }

  if (err instanceof InvalidImageFormatError) {
    return res.status(400).send({
      error_code: 'INVALID_IMAGE_FORMAT',
      error_description: err.message,
    })
  }

  if (err instanceof MeasureAlreadyExistsError) {
    return res.status(409).send({
      error_code: 'DOUBLE_REPORT',
      error_description: err.message,
    })
  }

  if (err instanceof MeasureAlreadyConfirmedError) {
    return res.status(409).send({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: err.message,
    })
  }

  if (err instanceof MeasureNotFoundError) {
    return res.status(409).send({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: err.message,
    })
  }

  if (err instanceof MeasuresNotFoundError) {
    return res.status(409).send({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: err.message,
    })
  }

  return res.status(500).send({
    error_code: 'INTERNAL_ERROR',
    error_description: err.message,
  })
}
