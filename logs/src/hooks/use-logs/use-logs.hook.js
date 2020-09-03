import { useRequest } from '../use-request/use-request.hook'
import { objectToUrl } from 'app-helpers'

const useLogs = () => {
  const { get } = useRequest('/logs-service')

  const getApplicationLogs = async logsObject => {
    const url = objectToUrl({ baseUrl: 'logs', data: logsObject })
    return await get(url)
  }

  return {
    getApplicationLogs,
  }
}

export { useLogs }
