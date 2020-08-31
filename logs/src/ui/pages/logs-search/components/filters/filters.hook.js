import { useInput, useForm } from 'app-hooks'
import { INPUT_MASKS } from 'app-constants'
import { fullDateValidator } from 'app-validators'
import { fullDateFormatter } from 'app-formatters'
import { DateHelper } from 'app-helpers'

const useLogFilters = () => {
  const { getForm } = useForm()

  const filterText = useInput({
    name: 'filterText',
    label: 'Digite um texto de busca...',
    variant: 'larger',
  })

  const initialDate = useInput({
    name: 'initialDate',
    label: 'Data de início',
    variant: 'larger',
    placeholder: INPUT_MASKS.fullDateMask,
    validators: [value => fullDateValidator({ value })],
    formatters: [value => fullDateFormatter(value)],
    canShowDatepickerIcon: true,
  })

  const finalDate = useInput({
    name: 'finalDate',
    label: 'Data de fim',
    variant: 'larger',
    placeholder: INPUT_MASKS.fullDateMask,
    validators: [value => fullDateValidator({ value })],
    formatters: [value => fullDateFormatter(value)],
    canShowDatepickerIcon: true,
  })

  const fields = [filterText, initialDate, finalDate]

  const buildApiObject = () => ({
    filterText: filterText.value,
    fromDate: DateHelper.toISOString({
      date: initialDate.value,
    }),
    toDate: DateHelper.toISOString({
      date: finalDate.value,
    }),
  })

  const fieldsValues = fields.map(field => field.value)

  return {
    getFilterFields: () => getForm(fields),
    buildApiObject,
    fieldsValues,
  }
}

export { useLogFilters }
