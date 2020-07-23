import { createBrowserHistory } from 'history'

const basename = process.env.BASENAME
let history
let currentPath = ''

export const useHistory = () => {
  if (!history) {
    history = createBrowserHistory({
      basename,
      getUserConfirmation: (message, callback) => {
        const result = window.confirm(message)
        callback(result)
      },
    })

    history.block(location => {
      currentPath = location.pathname
    })
  }

  return {
    history,
  }
}
