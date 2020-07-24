import createGlobalState from 'react-create-global-state'
import { useTimeout } from '../use-timeout/use-timeout.hook'

let loadingCounter = 0
let loadingTimer
const [useGlobalLoading, LoadingProvider] = createGlobalState(false)

const useLoading = () => {
  const [isLoading, setLoading] = useGlobalLoading()
  const { addTimeout, stopTimeout } = useTimeout()

  const showLoading = () => {
    loadingCounter++
    stopTimeout(loadingTimer)
    setLoading(loadingCounter > 0)
  }

  const hideLoading = () => {
    loadingCounter--
    loadingTimer = addTimeout(
      () => {
        setLoading(loadingCounter > 0)
      },
      300,
      { preventAutoClean: true }
    )
  }

  const withLoading = async callback => {
    showLoading()

    try {
      const result = await callback
      return result
    } finally {
      setTimeout(() => {
        hideLoading()
      }, 3000)
    }
  }

  return {
    isLoading,
    showLoading,
    hideLoading,
    withLoading,
  }
}

export { LoadingProvider, useLoading }
