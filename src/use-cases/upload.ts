import { randomUUID } from 'node:crypto'
import { model } from '../lib/gemini'
import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { getImageFormatFromBase64 } from '@/helper/get-image-format'
import { saveTempImage } from '@/helper/save-temp-image'
import { MeasureAlreadyExistsError } from '@/http/errors/measure-already-exists'
import { InvalidImageFormatError } from '@/http/errors/invalid-image-format'

interface UploadMeasureUseCaseParams {
  customer_code: string
  image: string
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
  base_url: string
}

export class UploadMeasureUseCase {
  constructor(private measuresRepository: PrismaMeasuresRepository) {}

  async execute({
    image,
    customer_code,
    measure_datetime,
    measure_type,
    base_url,
  }: UploadMeasureUseCaseParams) {
    const measureAlreadyExists = await this.measuresRepository.findByMonth({
      customer_code,
      month: measure_datetime.getUTCMonth() + 1,
      year: measure_datetime.getUTCFullYear(),
      measure_type,
    })

    if (measureAlreadyExists.length > 0) {
      throw new MeasureAlreadyExistsError()
    }

    const measureId = randomUUID().toString()

    const imageFormat = getImageFormatFromBase64(image)

    if (imageFormat === null) {
      throw new InvalidImageFormatError()
    }

    saveTempImage(image, imageFormat, measureId)

    const imageUrl = `${base_url}/public/${measureId}.${imageFormat}`

    const { response } = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: `image/${imageFormat}`,
        },
      },
      {
        text: 'The image being sent is a water or gas meter. Extract only the numbers from the meter reading. The output should contain only the numbers and nothing else.',
      },
    ])

    const measure = await this.measuresRepository.create({
      customer_code,
      date: measure_datetime,
      id: measureId,
      type: measure_type,
      value: response.text(),
    })

    return {
      image_url: imageUrl,
      measure_value: measure.value,
      measure_uuid: measure.id,
    }
  }
}
