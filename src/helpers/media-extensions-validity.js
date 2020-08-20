import fileType from 'file-type'
import { MIME_TYPES } from 'app-constants'

export class MediaExtentionsValidity {
  static getRealFileType = async file => {
    const reader = new FileReader()

    return new Promise(resolve => {
      reader.onload = buffer => {
        if (file.type === MIME_TYPES.TXT) {
          resolve({ ext: 'txt', mime: MIME_TYPES.TXT })
        }

        resolve(fileType(buffer.target.result))
      }
      reader.readAsArrayBuffer(file)
    })
  }
}
