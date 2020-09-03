import createGlobalState from 'react-create-global-state'
import { useTimeout } from '../use-timeout/use-timeout.hook'

let timeoutSession

const DEFAULT_CONFIG = {
  class: 'default',
  isVisible: false,
  message: '',
  timeout: 5000,
}

const [useGlobalToastAlert, ToastAlertProvider] = createGlobalState(DEFAULT_CONFIG)

const useToastAlert = () => {
  const [config, setConfig] = useGlobalToastAlert()
  const { addTimeout, stopTimeout } = useTimeout()

  const alertTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }

  const showSuccessToastAlert = (message, customTimeout) => {
    const timeout = Number(customTimeout) ? customTimeout : DEFAULT_CONFIG.timeout
    showToast({ message, timeout, type: alertTypes.SUCCESS })
  }

  const showErrorToastAlert = (message, customTimeout) => {
    const timeout = Number(customTimeout) ? customTimeout : DEFAULT_CONFIG.timeout
    showToast({ message, timeout, type: alertTypes.ERROR })
  }

  const showToast = configReceived => {
    if (timeoutSession) {
      stopTimeout(timeoutSession)
      timeoutSession = null
    }

    if (configReceived.type === alertTypes.SUCCESS) {
      configReceived.classType = 'success'
    }

    if (configReceived.type === alertTypes.ERROR) {
      configReceived.classType = 'error'
    }

    configReceived.isVisible = true

    setConfig(prevState => ({ ...prevState, ...configReceived }))

    timeoutSession = addTimeout(() => hideToast(), config.timeout || DEFAULT_CONFIG.timeout)
  }

  const hideToast = () => {
    setConfig(DEFAULT_CONFIG)
  }

  return {
    config,
    showSuccessToastAlert,
    showErrorToastAlert,
    showToast,
    hideToast,
  }
}

export { useToastAlert, ToastAlertProvider }
