import createGlobalState from 'react-create-global-state'
import { noopFunction } from 'app-helpers'

const DEFAULT_CONFIG = {
  isActive: false,
  content: null,
  onClose: noopFunction,
}

const [useGlobalModal, ModalProvider] = createGlobalState(DEFAULT_CONFIG)

const useModal = () => {
  const [config, setConfig] = useGlobalModal()

  const showModal = ({ content, onClose = DEFAULT_CONFIG.onClose }) => {
    const configUpdate = {
      isActive: true,
      content,
      onClose,
    }

    setConfig(prevState => ({ ...prevState, ...configUpdate }))
  }

  const hideModal = () => {
    setConfig(prevState => ({ ...prevState, isActive: false }))
  }

  return {
    showModal,
    hideModal,
    isActive: config.isActive,
    content: config.content,
    onClose: config.onClose,
  }
}

export { useModal, ModalProvider }
