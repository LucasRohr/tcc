import { http } from './http'
import { tokenHelper } from './token-helper'

const instance = http

const useRequest = path => {
  const buildHeaders = reCaptchaToken => {
    const headers = {}
    const RECAPTCHA_HEADER = 'X-Recaptcha'
    const AUTHORIZATION_HEADER = 'Authorization'
    headers[AUTHORIZATION_HEADER] = tokenHelper.get()
    if (reCaptchaToken) headers[RECAPTCHA_HEADER] = reCaptchaToken
    return headers
  }

  const buildUrl = url => {
    return url ? `${path}/${url}` : path
  }

  const callApi = async ({
    useStateErrors = true,
    useToast = true,
    // TO DO: define app loader on request ans implement loader hook
    useLoader = true,
    reCaptchaToken,
    url,
    data,
    ...config
  }) => {
    config.url = buildUrl(url)
    config.headers = buildHeaders(reCaptchaToken)

    try {
      const result = await instance.request(config)
      return result.data
    } catch (apiError) {
      console.log(apiError)
    }
  }

  return {
    get: async (url, config = {}) => await callApi({ method: 'GET', url, ...config }),
    del: async (url, config = {}) => await callApi({ method: 'DELETE', url, ...config }),
    put: async (url, data, config = {}) => await callApi({ method: 'PUT', url, data, ...config }),
    post: async (url, data, config = {}) => await callApi({ method: 'POST', url, data, ...config }),
  }
}

export { useRequest }
