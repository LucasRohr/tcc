import { useInput, useForm } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountStep = () => {
  const { getForm, isValid } = useForm()

  const accountName = useInput({
    name: 'accountName',
    label: 'Nome da sua conta',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const cryptoPassword = useInput({
    name: 'cryptoPassword',
    label: 'Senha de segurança',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
    usePassword: true
  })

  const fields = [accountName, cryptoPassword]

  const buildApiObject = () => ({
    accountName: accountName.value,
    cryptoPassword: cryptoPassword.value
  })

  return {
    isValid: () => isValid({ fields }),
    renderAccountFormFields: () => getForm(fields),
    buildApiObject,
  }
}

export { useAccountStep }
