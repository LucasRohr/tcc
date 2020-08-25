const useForm = () => {
  const wasUpdated = fields => {
    return fields.some(field => field.wasUpdated)
  }

  const isValid = async ({ fields, ignoreInputErrors = false, ignoreScroll = false } = {}) => {
    const invalidFields = []

    /* eslint-disable no-unused-vars */
    for (const field of fields) {
      const isFieldValid = await field.isValid({ ignoreInputErrors })

      if (!isFieldValid) {
        invalidFields.push(field)
      }
    }
    /* eslint-enable no-unused-vars */

    if (!ignoreScroll && !ignoreInputErrors && invalidFields.length) {
      invalidFields[0].scrollTo()
    }

    return !invalidFields.length
  }

  const fillFields = (fields, model) => {
    fields.forEach(field => {
      console.log(field)
      if (model[field.name]) {
        field.setInitialValue(model[field.name])
      }
    })
  }

  const getForm = fields => {
    return fields.map((field, key) => field.getInputComponent(key))
  }

  const cleanFields = fields => {
    fields.forEach(field => {
      field.resetInput()
    })
  }

  return {
    getForm,
    isValid,
    fillFields,
    wasUpdated,
    cleanFields,
  }
}

export { useForm }
