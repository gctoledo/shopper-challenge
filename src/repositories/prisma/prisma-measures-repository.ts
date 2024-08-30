import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaMeasuresRepository {
  async create(data: Prisma.MeasureUncheckedCreateInput) {
    const measure = await prisma.measure.create({
      data,
    })

    return measure
  }

  async confirm(id: string, value: number) {
    const measure = await prisma.measure.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
        value,
      },
    })

    return measure
  }

  async findById(id: string) {
    const measure = await prisma.measure.findUnique({
      where: {
        id,
      },
    })

    return measure
  }

  async findByMonth({
    customer_code,
    month,
    year,
    measure_type,
  }: {
    customer_code: string
    month: number
    year: number
    measure_type: 'WATER' | 'GAS'
  }) {
    const measures = await prisma.measure.findMany({
      where: {
        customer_code,
        type: measure_type,
        date: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0),
        },
      },
    })

    return measures
  }
}
