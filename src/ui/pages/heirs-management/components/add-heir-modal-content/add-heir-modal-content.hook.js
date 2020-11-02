import { useEffect } from 'react'
import { emailValidator } from 'app-validators'
import { useForm, useInput, useInvite, useLoggedUser } from 'app-hooks'

const useAddHeirModalContent = () => {
  const { isValid, getForm } = useForm()
  const { inviteHeir } = useInvite()
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
    phone: phone.value,
    ownerId: loggedUser.currentAccount.id,
    ownerName: loggedUser.name,
  })

  const sendToApi = async apiObject => {
    return await inviteHeir(apiObject)
  }

  return {
    renderFields: () => getForm(fields),
    buildApiObject,
    sendToApi,
    isValid: () => isValid({ fields }),
  }
}

export { useAddHeirModalContent }
