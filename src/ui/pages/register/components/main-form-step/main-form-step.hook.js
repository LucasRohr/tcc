import { useEffect } from 'react'
import { useForm, useInput } from 'app-hooks'
import { emailValidator, CPFValidator, fullDateValidator, fullNameValidator } from 'app-validators'
import { fullNameFormatter, CPFFormatter, fullDateFormatter } from 'app-formatters'
import { INPUT_MASKS } from 'app-constants'

const useMainFormStep = ({ currentFieldsData }) => {
  const { isValid, getForm, fillFields } = useForm()

  useEffect(() => {
    if (currentFieldsData) {
      fillFields(fields, currentFieldsData)
    }
  }, [currentFieldsData])

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => fullNameValidator({ value })],
    formatters: [value => fullNameFormatter(value)],
  })

  const email = useInput({
    name: 'email',
    type: 'email',
    label: 'E-mail',
    variant: 'full',
    validators: [value => emailValidator({ value })],
  })

  const cpf = useInput({
    name: 'cpf',
    label: 'CPF',
    variant: 'full',
    validators: [value => CPFValidator({ value })],
    formatters: [value => CPFFormatter(value)],
  })

  const birthday = useInput({
    name: 'birthday',
    label: 'Data de nascimento',
    variant: 'full',
    placeholder: INPUT_MASKS.fullDateMask,
    validators: [value => fullDateValidator({ value })],
    formatters: [value => fullDateFormatter(value)],
  })

  const fields = [name, email, cpf, birthday]

  const buildApiObject = () => ({
    name: name.value,
    email: email.value,
    cpf: cpf.value,
    birthday: birthday.value,
  })

  return {
    isValid: () => isValid({ fields }),
    renderMainFormFields: () => getForm(fields),
    buildApiObject,
  }
}

export { useMainFormStep }
