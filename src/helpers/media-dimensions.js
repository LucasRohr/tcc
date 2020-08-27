export class MediaDimensions {
  static getImageDimensionsFromFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.onload = () => {
        const img = new Image()
        img.src = reader.result

        img.onload = () =>
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight
          })
      }

      reader.readAsDataURL(file)
    })
  }
}
