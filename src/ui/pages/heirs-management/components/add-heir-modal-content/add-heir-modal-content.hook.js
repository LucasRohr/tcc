import { useForm, useInput } from 'app-hooks'
import { emailValidator } from 'app-validators'
import { useOwner, useMessage } from 'app-hooks'
import { useEffect } from 'react'

const useAddHeirModalContent = () => {
  const { isValid, getForm } = useForm()
  const { inviteHeir } = useOwner()
  const { sendSms } = useMessage()

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
      return await sendSms(phone.value)
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
