import { useMemo, useEffect } from 'react'
import createGlobalState from 'react-create-global-state'
import { MAX_MOBILE_WIDTH } from 'app-constants'

const [useGlobalWindowSize, WindowSizeProvider] = createGlobalState({})

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useGlobalWindowSize()

  const isMobileResolution = useMemo(() => windowSize.width <= MAX_MOBILE_WIDTH, [windowSize.width])

  const setSizeState = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
      body: {
        height: document.body.clientHeight,
        width: document.body.clientWidth,
      },
    })
  }

  useEffect(() => {
    setSizeState()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => setSizeState())

    return () => window.removeEventListener('resize', () => setSizeState())
  }, [])

  return {
    windowSize,
    isMobileResolution,
  }
}

export { useWindowSize, WindowSizeProvider }
