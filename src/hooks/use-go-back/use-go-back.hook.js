import createGlobalState from 'react-create-global-state'

const [useGlobalGoBack, GoBackProvider] = createGlobalState([])

const useGoBack = () => {
  const [goBackIndexList, setGoBackIndexList] = useGlobalGoBack([])

  const decreaseCurrentIndex = () => {
    setGoBackIndexList(list => {
      const [currentIndex, ...rest] = list
      return [(currentIndex || 0) - 1, ...rest]
    })
  }

  const startNewIndex = () => {
    setGoBackIndexList(list => [0, ...list])
  }

  const ignoreLinkToGoback = () => {
    decreaseCurrentIndex()
  }

  const getGoBackIndex = () => {
    const [currentIndex, ...rest] = goBackIndexList
    setGoBackIndexList(rest)
    return (currentIndex || 0) - 1
  }

  return {
    ignoreLinkToGoback,
    startNewIndex,
    decreaseCurrentIndex,
    getGoBackIndex,
  }
}

export { useGoBack, GoBackProvider }
