import { useInput, useForm } from 'app-hooks'
import { INPUT_MASKS, API_DATE_FORMAT } from 'app-constants'
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

  const fromDate = useInput({
    name: 'initialDate',
    label: 'Data de início',
    variant: 'larger',
    placeholder: INPUT_MASKS.fullDateMask,
    validators: [value => fullDateValidator({ value })],
    formatters: [value => fullDateFormatter(value)],
    canShowDatepickerIcon: true,
  })

  const toDate = useInput({
    name: 'finalDate',
    label: 'Data de fim',
    variant: 'larger',
    placeholder: INPUT_MASKS.fullDateMask,
    validators: [value => fullDateValidator({ value })],
    formatters: [value => fullDateFormatter(value)],
    canShowDatepickerIcon: true,
  })

  const fields = [filterText, fromDate, toDate]

  const buildApiObject = () => ({
    filterText: filterText.value,
    fromDate: fromDate.value ? new DateHelper({ date: fromDate.value }).format(API_DATE_FORMAT) : null,
    toDate: toDate.value ? new DateHelper({ date: toDate.value }).format(API_DATE_FORMAT) : null,
  })

  const fieldsValues = fields.map(field => field.value)

  return {
    getFilterFields: () => getForm(fields),
    buildApiObject,
    fieldsValues,
  }
}

export { useLogFilters }
