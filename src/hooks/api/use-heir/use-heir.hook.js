import { useRequest } from '../use-request/use-request.hook'

const useHeir = () => {
  const { get } = useRequest('/heir')

  const getHeritages = async heirId => {
    return await get(`${heirId}/heir-heritages`)
  }

  return {
    getHeritages,
  }
}

export { useHeir }
