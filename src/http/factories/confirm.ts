import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { ConfirmMeasureUseCase } from '@/use-cases/confirm'

export const makeConfirmMeasureUseCase = () => {
  const measuresRepository = new PrismaMeasuresRepository()
  const confirmMeasureUseCase = new ConfirmMeasureUseCase(measuresRepository)

  return confirmMeasureUseCase
}
