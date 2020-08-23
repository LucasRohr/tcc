import createGlobalState from 'react-create-global-state'
import { useHistory } from '../use-history/use-history.hook'
import { useGoBack } from '../use-go-back/use-go-back.hook'
import { paths } from 'app-constants'

const [useGlobalOriginalRouteRedirect, OriginalRouteRedirectProvider] = createGlobalState(true)

const clearDefaultConfigFromOnClick = config => {
  return config && config.constructor && config.constructor.name !== 'Object' ? undefined : config
}

const useRoute = () => {
  const [shouldRedirectToOriginalRoute, setShouldRedirectToOriginalRoute] = useGlobalOriginalRouteRedirect(true)
  const { history } = useHistory()
  const { startNewIndex, decreaseCurrentIndex, getGoBackIndex } = useGoBack()

  const handlePath = (path, cleanConfig) => {
    if (window.location.pathname === path) {
      history.push(paths.reload(), cleanConfig)
      history.goBack()
    } else {
      history.push(path, cleanConfig)
    }
  }

  const changeRoute = (path, config) => {
    const cleanConfig = clearDefaultConfigFromOnClick(config)
    if (cleanConfig && cleanConfig.internalRedirect) {
      decreaseCurrentIndex()
    } else {
      startNewIndex()
    }

    handlePath(path, cleanConfig)
  }

  // Login
  const goToLogin = config => {
    changeRoute(paths.login(), config)
  }

  // Register
  const goToRegister = config => {
    changeRoute(paths.register(), config)
  }

  // Begin
  const goToBegin = config => {
    changeRoute(paths.begin(), config)
  }

  // Home
  const goToHome = config => {
    changeRoute(paths.home(), config)
  }

  // Heirs
  const goToHeirsManagement = config => {
    changeRoute(paths.heirs(), config)
  }

  // Medias
  const goToMediasManagement = config => {
    changeRoute(paths.medias(), config)
  }

  // Credentials
  const goToCredentialsManagement = config => {
    changeRoute(paths.credentials(), config)
  }

  //Generic
  const goTo = (path, config) => {
    if (config && config.redirectedFromLogin) {
      if (shouldRedirectToOriginalRoute) {
        changeRoute(path, config)
        setShouldRedirectToOriginalRoute(false)
      } else {
        goToBegin()
      }
    } else {
      changeRoute(path, config)
    }
  }

  const goBack = () => {
    history.go(getGoBackIndex())
  }

  return {
    goTo,
    goBack,
    goToLogin,
    goToRegister,
    goToHome,
    goToHeirsManagement,
    goToMediasManagement,
    goToCredentialsManagement,
    goToBegin,
    setShouldRedirectToOriginalRoute,
  }
}

export { useRoute, OriginalRouteRedirectProvider }
