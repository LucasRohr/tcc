import { useRequest } from '../use-request/use-request.hook'

const useHeir = () => {
  const { get, put, post } = useRequest('/heir')

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

  const validateDigitalDeathCertificate = async certificateObject => {
    const result = await post('certificate-validation', certificateObject)
    return result !== undefined
  }

  return {
    getHeritages,
    getReceivedMedias,
    updateHeirItems,
    validateDigitalDeathCertificate,
  }
}

export { useHeir }
