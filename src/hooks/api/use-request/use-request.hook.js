import { http } from './http'
import { tokenHelper } from './token-helper'
import { useLoading } from '../../use-loading/use-loading.hook'

const instance = http

const useRequest = path => {
  const { withLoading } = useLoading()

  const buildHeaders = () => {
    const headers = {}
    const AUTHORIZATION_HEADER = 'Authorization'
    headers[AUTHORIZATION_HEADER] = tokenHelper.get()
    return headers
  }

  const buildUrl = url => {
    return url ? `${path}/${url}` : path
  }

  const callApi = async ({ useStateErrors = true, useToast = true, useLoader = true, url, data, ...config }) => {
    config.url = buildUrl(url)
    config.headers = buildHeaders()

    try {
      const result = useLoader ? await withLoading(instance.request(config)) : await instance.request(config)
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
