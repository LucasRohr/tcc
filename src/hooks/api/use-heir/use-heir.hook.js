import { useRequest } from '../use-request/use-request.hook'

const useHeir = () => {
  const { get, put, post } = useRequest('/user-service/accounts/heir')

  const createHeirAccount = async heirObject => {
    const result = await post('heir-creation', heirObject)
    return result !== undefined
  }

  const getHeritages = async heirId => {
    return await get(`heir-heritages?heir_id=${heirId}`)
  }

  const updateHeirItems = async (heirId, updateRequest) => {
    const result = await put(`items-update?heir_id=${heirId}`, updateRequest)
    return result !== undefined
  }

  const validateDigitalDeathCertificate = async certificateObject => {
    const result = await put('certificate-validation', certificateObject)
    return result !== undefined
  }

  return {
    createHeirAccount,
    getHeritages,
    updateHeirItems,
    validateDigitalDeathCertificate,
  }
}

export { useHeir }
