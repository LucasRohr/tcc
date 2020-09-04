import { useRequest } from '../use-request/use-request.hook'
import { useLoggedUser } from '../../use-logged-user/use-logged-user.hook'

const SMS_KEY =
  'FCSETRIF7T8XUWVGDH9QWQDH82P8OSFP3GDH3N9GQW6Y4WL94LDO5TWNFIMHKY5A9LEYJ5X4EGP1MYQCO3WTLCDIY0ZNLER0ILXO1IEI22PRRN03LJB5AIT8LEM5KO5W'

const useMessage = () => {
  const { get } = useRequest('/message-service')
  const { loggedUser } = useLoggedUser()

  const getAppLinkCode = async () => {
    return await get('messages/link-code')
  }

  const sendSms = async number => {
    const linkCode = await getAppLinkCode()

    const message = `Convite da herança digital de ${loggedUser.name}.\nMais detalhes no link abaixo.\nAt, equipe Herança Digital.\nhttp://localhost:3000/registro?code=${linkCode}`

    const smsObject = {
      key: SMS_KEY,
      type: 9,
      msg: message,
      number,
    }

    const result = await fetch('https://api.smsdev.com.br/v1/send', { method: 'post', body: JSON.stringify(smsObject) })
    return result !== undefined
  }

  return {
    sendSms,
  }
}

export { useMessage }
