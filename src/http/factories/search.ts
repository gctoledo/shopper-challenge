import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { SearchMeasureUseCase } from '@/use-cases/search'

export const makeSearchMeasureUseCase = () => {
  const measuresRepository = new PrismaMeasuresRepository()
  const searchMeasureUseCase = new SearchMeasureUseCase(measuresRepository)

  return searchMeasureUseCase
}
