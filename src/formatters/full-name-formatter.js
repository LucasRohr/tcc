const FULL_NAME_WITHOUT_SPECIAL_CHARACTERS_REGEX = /[^a-zA-Z\u00C0-\u017F\-'\s]+/g

const fullNameFormatter = value => {
  return value.replace(FULL_NAME_WITHOUT_SPECIAL_CHARACTERS_REGEX, '')
}

export { fullNameFormatter }
