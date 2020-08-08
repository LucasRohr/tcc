import { useState } from 'react'
import { https } from './https'
import { tokenHelper } from './token-helper'
import { useLoading } from '../../use-loading/use-loading.hook'
import { useToastAlert } from '../../use-toast/use-toast.hook'
import { useTimeout } from '../../use-timeout/use-timeout.hook'
import { useGlobalLoggedUser, removeToken } from '../../use-logged-user/use-logged-user.hook'
import { RequestError } from 'app-models'
import { DEFAULT_EXCEPTION } from 'app-constants'

const instance = https

const UNAUTHORIZED_STATUS = 401

const useRequest = path => {
  const [errors, setErrors] = useState([])

  const { withLoading } = useLoading()
  const { showErrorToastAlert } = useToastAlert()
  const { clearAllTimeouts } = useTimeout()
  const [globalLoggedUser, setGlobalLoggedUser] = useGlobalLoggedUser()

  const buildHeaders = () => {
    const headers = {}
    const AUTHORIZATION_HEADER = 'Authorization'
    headers[AUTHORIZATION_HEADER] = tokenHelper.get()
    return headers
  }

  const buildData = data => {
    if (data) {
      return data
    }
  }

  const buildUrl = url => {
    return url ? `${path}/${url}` : path
  }

  const handleException = error => {
    throw new RequestError(error.response.data)
  }

  const handleErrorStatus = statusCode => {
    if (statusCode === UNAUTHORIZED_STATUS) {
      if (globalLoggedUser) {
        clearAllTimeouts()
        removeToken()
        setGlobalLoggedUser(null)
      }
    }
  }

  const handleErrorInfo = (error, useToast, useStateErrors) => {
    const message = error.message
    if (useToast) {
      showErrorToastAlert(message)
    }

    if (useStateErrors) {
      errors[0] = error
      setErrors(errors)
    } else {
      throw error
    }
  }

  const handleErrorMessage = (apiError, useToast, useStateErrors) => {
    try {
      handleException(apiError)
    } catch (appError) {
      handleErrorInfo(appError, useToast, useStateErrors)
    }
  }

  const callApi = async ({
    useStateErrors = true,
    useToast = true,
    useLoader = true,
    url,
    data,
    returnHeader = false,
    ...config
  }) => {
    config.url = buildUrl(url)
    config.data = buildData(data)
    config.headers = buildHeaders()

    try {
      const result = useLoader ? await withLoading(instance.request(config)) : await instance.request(config)
      return returnHeader ? { header: result.headers, data: result.data } : result.data
    } catch (apiError) {
      if (apiError.response) {
        handleErrorStatus(apiError.response && apiError.response.status)
        handleErrorMessage(apiError, useToast, useStateErrors)
      } else {
        showErrorToastAlert(DEFAULT_EXCEPTION)
      }
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
