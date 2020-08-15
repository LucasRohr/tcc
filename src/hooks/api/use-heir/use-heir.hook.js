import { useRequest } from '../use-request/use-request.hook'

const useHeir = () => {
  const { get } = useRequest('/heir')

  const getHeritages = async heirId => {
    return await get(`${heirId}/heir-heritages`)
  }

  const getReceivedMedias = async heirId => {
    return await get(`${heirId}/medias`)
  }

  return {
    getHeritages,
    getReceivedMedias,
  }
}

export { useHeir }
