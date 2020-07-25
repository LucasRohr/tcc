let timeoutList = []

const useTimeout = () => {
  const clearAllTimeouts = () => {
    timeoutList.forEach(id => clearTimeout(id))
    timeoutList = []
  }

  const stopTimeout = timeoutId => {
    clearTimeout(timeoutId)
    timeoutList = timeoutList.filter(id => id !== timeoutId)
  }

  const addTimeout = (func, time, options = {}) => {
    const timeoutId = setTimeout(func, time)
    if (!options.preventAutoClean) {
      timeoutList = [...timeoutList, timeoutId]
    }

    return timeoutId
  }

  const getDebounce = () => {
    let debounceId = null
    return (func, time, options = {}) => {
      stopTimeout(debounceId)
      debounceId = addTimeout(func, time, options)
    }
  }

  return {
    clearAllTimeouts,
    stopTimeout,
    addTimeout,
    getDebounce,
  }
}

export { useTimeout }
