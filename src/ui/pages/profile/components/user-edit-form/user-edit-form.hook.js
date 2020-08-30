import { useEffect } from 'react'
import { useForm, useInput, useLoggedUser, useUser } from 'app-hooks'
import { minLengthValidator, emailValidator, CPFValidator, fullDateValidator } from 'app-validators'
import { CPFFormatter, fullDateFormatter } from 'app-formatters'
import { INPUT_MASKS } from 'app-constants'
import { DateHelper } from 'app-helpers'

const useUserEditForm = ({ initialData }) => {
  const { isValid, getForm, fillFields } = useForm()
  const { updateUserInfo } = useUser()
  const { loggedUser } = useLoggedUser()

  const name = useInput({
    name: 'name',
    label: 'Nome',
    variant: 'full',
    validators: [value => minLengthValidator({ value, minLength: 2 })],
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

  useEffect(() => {
    if (initialData) {
      fillFields(fields, initialData)
    }
  }, [initialData])

  const buildApiObject = () => ({
    name: name.value,
    email: email.value,
    cpf: cpf.value,
    birthday: DateHelper.toISOString({
      date: birthday.value,
    }),
  })

  const sendToApi = async apiObject => {
    return await updateUserInfo(loggedUser.id, apiObject)
  }

  return {
    isValid: () => isValid({ fields }),
    renderEditForm: () => getForm(fields),
    buildApiObject,
    sendToApi,
  }
}

export { useUserEditForm }
