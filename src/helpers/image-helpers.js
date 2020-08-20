const createImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

const convertBlobToDataUrl = async blob => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(blob)
  })
}

export { createImage, convertBlobToDataUrl }
