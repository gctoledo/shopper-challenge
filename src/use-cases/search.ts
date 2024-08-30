import { MeasuresNotFoundError } from '@/http/errors/measures-not-found'
import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'

interface SearchMeasureUseCaseParams {
  customer_code: string
  measure_type?: 'WATER' | 'GAS'
}

export class SearchMeasureUseCase {
  constructor(private measuresRepository: PrismaMeasuresRepository) {}

  async execute({ customer_code, measure_type }: SearchMeasureUseCaseParams) {
    const measures = await this.measuresRepository.findByCustomer({
      customer_code,
      type: measure_type,
    })

    if (measures.length === 0) {
      throw new MeasuresNotFoundError()
    }

    return {
      measures,
    }
  }
}
