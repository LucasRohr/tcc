import createGlobalState from 'react-create-global-state'
import { useHistory } from '../use-history/use-history.hook'
import { useGoBack } from '../use-go-back/use-go-back.hook'
import { paths, ROLES } from 'app-constants'
import { useLoggedUser } from '../use-logged-user/use-logged-user.hook'

const [useGlobalOriginalRouteRedirect, OriginalRouteRedirectProvider] = createGlobalState(true)

const clearDefaultConfigFromOnClick = config => {
  return config && config.constructor && config.constructor.name !== 'Object' ? undefined : config
}

const useRoute = () => {
  const [shouldRedirectToOriginalRoute, setShouldRedirectToOriginalRoute] = useGlobalOriginalRouteRedirect(true)
  const { history } = useHistory()
  const { startNewIndex, decreaseCurrentIndex, getGoBackIndex } = useGoBack()
  const { loggedUser } = useLoggedUser()

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

  // Homes
  const goToHome = config => {
    const homePath = loggedUser && loggedUser.currentAccount.type === ROLES.OWNER ? paths.homeOwner() : paths.homeHeir()
    changeRoute(homePath, config)
  }

  const goToHomeOwner = config => {
    changeRoute(paths.homeOwner(), config)
  }

  const goToHomeHeir = config => {
    changeRoute(paths.homeHeir(), config)
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
    goToHomeOwner,
    goToHomeHeir,
    goToBegin,
    setShouldRedirectToOriginalRoute,
  }
}

export { useRoute, OriginalRouteRedirectProvider }
