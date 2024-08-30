import { MeasureAlreadyConfirmedError } from '@/http/errors/measure-already-confirmed'
import { MeasureNotFoundError } from '@/http/errors/measure-not-found'
import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'

interface ConfirmMeasureUseCaseParams {
  id: string
  value: number
}

export class ConfirmMeasureUseCase {
  constructor(private measuresRepository: PrismaMeasuresRepository) {}

  async execute({ id, value }: ConfirmMeasureUseCaseParams) {
    const measure = await this.measuresRepository.findById(id)

    if (!measure) {
      throw new MeasureNotFoundError()
    }

    if (measure.confirmed) {
      throw new MeasureAlreadyConfirmedError()
    }

    const updatedMeasure = await this.measuresRepository.confirm(id, value)

    return updatedMeasure
  }
}
