export const getVideoDuration = file => {
  return new Promise(resolve => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(Math.floor(video.duration))
    }

    video.src = URL.createObjectURL(file)
  })
}
