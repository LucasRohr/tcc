import { useInput, useForm } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountStep = () => {
  const { getForm, isValid } = useForm()

  const account = useInput({
    name: 'account ',
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

  const fields = [account, cryptoPassword]

  const buildApiObject = () => ({
    account: account.value,
    cryptoPassword: cryptoPassword.value
  })

  return {
    isValid: () => isValid({ fields }),
    renderAccountFormFields: () => getForm(fields),
    buildApiObject,
  }
}

export { useAccountStep }
