import type { Area } from 'react-easy-crop'

export async function getCroppedImage(
  imageSrc: string,
  crop: Area,
): Promise<File> {
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => (image.onload = resolve))

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  canvas.width = crop.width
  canvas.height = crop.height

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas vazio'))
          return
        }

        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' })
        resolve(file)
      },
      'image/jpeg',
      0.8,
    )
  })
}
