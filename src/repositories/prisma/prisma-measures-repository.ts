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
}
