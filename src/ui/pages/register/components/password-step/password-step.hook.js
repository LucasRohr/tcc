import { useEffect } from 'react'
import { useForm, useInput } from 'app-hooks'
import { passwordValidator } from 'app-validators'

const usePasswordStep = ({ currentFieldsData }) => {
  const { isValid, getForm, fillFields } = useForm()

  useEffect(() => {
    if (currentFieldsData) {
      fillFields(fields, currentFieldsData)
    }
  }, [currentFieldsData])

  const samePasswordValidator = ({ value }) => (value === password.value ? null : 'Senha precisa ser igual a anterior')

  const password = useInput({
    name: 'password',
    label: 'Digite sua senha',
    variant: 'full',
    usePassword: true,
    validators: [value => passwordValidator({ value })],
  })

  const passwordConfirmation = useInput({
    name: 'passwordConfirmation',
    label: 'Confirme sua senha',
    variant: 'full',
    usePassword: true,
    validators: [value => samePasswordValidator({ value })],
  })

  const fields = [password, passwordConfirmation]

  const buildApiObject = () => ({
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  })

  return {
    isValid: () => isValid({ fields }),
    renderPasswordFormFields: () => getForm(fields),
    buildApiObject,
    password: password.value,
  }
}

export { usePasswordStep }
