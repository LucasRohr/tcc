import { useRequest } from '../use-request/use-request.hook'

const useMessage = () => {
  const { post } = useRequest('/message-service')

  const sendSms = async smsObject => {
    const result = await post('messages/sms', smsObject)
    return result !== undefined
  }

  return {
    sendSms,
  }
}

export { useMessage }
