import path from 'node:path'
import fs from 'node:fs'

export const saveTempImage = (
  base64Image: string,
  imageFormat: string,
  filename: string,
) => {
  const imageBuffer = Buffer.from(base64Image, 'base64')

  const tempDir = path.join(__dirname, '..', 'temp')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  const outputPath = path.join(tempDir, `${filename}.${imageFormat}`)

  fs.writeFileSync(outputPath, imageBuffer)
}
