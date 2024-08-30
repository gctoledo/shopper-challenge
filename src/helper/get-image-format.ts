export const getImageFormatFromBase64 = (
  base64Image: string,
): string | null => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')

  const buffer = Buffer.from(base64Data, 'base64')

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return 'jpeg'
  } else if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return 'png'
  } else {
    return null
  }
}
