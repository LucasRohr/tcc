import { useInput } from 'app-hooks'
import { minLengthValidator } from 'app-validators'

const useAccountStep = () => {
  const account = useInput({
    name: 'account ',
    label: 'Nome da sua conta',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
  })

  const buildApiObject = () => account.value

  return {
    isValid: () => account.isValid(),
    renderAccountFormFields: () => account.getInputComponent(),
    buildApiObject,
  }
}

export { useAccountStep }
