import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { UploadMeasureUseCase } from '@/use-cases/upload'

export const makeUploadMeasureUseCase = () => {
  const measuresRepository = new PrismaMeasuresRepository()
  const uploadMeasureUseCase = new UploadMeasureUseCase(measuresRepository)

  return uploadMeasureUseCase
}
