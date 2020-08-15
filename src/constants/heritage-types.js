import { ImageAssetIcon, VideoAssetIcon, DocumentAssetIcon, CredentialsIcon } from 'app-icons'

const HERITAGE_TYPES = {
  IMAGE: {
    key: 'IMAGE',
    label: 'Imagens',
    icon: ImageAssetIcon,
  },

  VIDEO: {
    key: 'VIDEO',
    label: 'Vídeos',
    icon: VideoAssetIcon,
  },

  DOCUMENT: {
    key: 'DOCUMENT',
    label: 'Documentos',
    icon: DocumentAssetIcon,
  },

  CREDENTIAL: {
    key: 'CREDENTIAL',
    label: 'Credenciais',
    icon: CredentialsIcon,
  },
}

export { HERITAGE_TYPES }
