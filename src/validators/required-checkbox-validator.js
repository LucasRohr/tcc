const MESSAGE = 'Campo Obrigatório'

const requiredCheckboxValidator = ({ isChecked = false }) => {
  return !isChecked ? MESSAGE : null
}

export { requiredCheckboxValidator }
