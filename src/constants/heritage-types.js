import { ImageAssetIcon, VideoAssetIcon, DocumentAssetIcon, CredentialsIcon } from 'app-icons'

const HERITAGE_TYPES = {
  IMAGE: {
    key: 'IMAGE',
    label: 'Imagens',
    icon: ImageAssetIcon,
    extensions: '.jpg, .png, .jpeg',
  },

  VIDEO: {
    key: 'VIDEO',
    label: 'Vídeos',
    icon: VideoAssetIcon,
    extensions: '.mp4, .webm',
  },

  DOCUMENT: {
    key: 'DOCUMENT',
    label: 'Documentos',
    icon: DocumentAssetIcon,
    extensions: '.pdf, .txt, .xls, .docx, .pptx, .csv',
  },

  CREDENTIAL: {
    key: 'CREDENTIAL',
    label: 'Credenciais',
    icon: CredentialsIcon,
  },
}

export { HERITAGE_TYPES }
