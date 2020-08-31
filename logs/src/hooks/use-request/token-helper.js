const ACCESS_TOKEN_KEY = 'access_token'

const tokenHelper = {
  save: token => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  delete: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
}

export { tokenHelper }
