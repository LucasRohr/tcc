import { useRequest } from '../use-request/use-request.hook'

const useHeir = () => {
  const { get, put } = useRequest('/heir')

  const getHeritages = async heirId => {
    return await get(`${heirId}/heir-heritages`)
  }

  const updateHeirItems = async (heirId, items) => {
    const result = await put(`${heirId}/items-update`, { items })
    return result !== undefined
  }

  const getReceivedMedias = async heirId => {
    return await get(`${heirId}/medias`)
  }

  return {
    getHeritages,
    getReceivedMedias,
    updateHeirItems,
  }
}

export { useHeir }
