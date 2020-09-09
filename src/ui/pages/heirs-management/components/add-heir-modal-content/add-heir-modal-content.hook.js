import { useEffect } from 'react'
import { emailValidator } from 'app-validators'
import { useForm, useInput, useOwner, useMessage, useLoggedUser } from 'app-hooks'
import { NOTIFICATION_TYPES } from 'app-constants'

const useAddHeirModalContent = () => {
  const { isValid, getForm } = useForm()
  const { inviteHeir } = useOwner()
  const { sendSms } = useMessage()
  const { loggedUser } = useLoggedUser()

  const email = useInput({
    name: 'email',
    type: 'email',
    label: 'E-mail do herdeiro',
    variant: 'full',
    validators: [value => emailValidator({ value })],
  })

  const phone = useInput({
    name: 'phone',
    type: 'number',
    variant: 'full',
    label: 'Telefone do herdeiro',
    maxLength: '11',
  })

  const setInputsRequiredRule = () => {
    email.setRequired(!phone.value)
    phone.setRequired(!email.value)
  }

  useEffect(() => {
    setInputsRequiredRule()
  }, [email.value, phone.value])

  const fields = [email, phone]

  const buildApiObject = () => ({
    email: email.value,
  })

  const sendToApi = async apiObject => {
    const result = await inviteHeir(apiObject)

    if (result) {
      const smsObject = {
        telephone: phone.value,
        type: NOTIFICATION_TYPES.HEIR_INVITE,
        ownerName: loggedUser.name,
      }

      return await sendSms(smsObject)
    }
  }

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields }),
  }
}

export { useAddHeirModalContent }
