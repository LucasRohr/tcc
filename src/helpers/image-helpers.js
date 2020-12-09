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

const convertBase64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const pureBase64String = b64Data.split(',')[1]

  const byteCharacters = atob(pureBase64String)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export { createImage, convertBlobToDataUrl, convertBase64toBlob }
