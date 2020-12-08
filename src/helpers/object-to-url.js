import { decamelize } from '@ridi/object-case-converter'

const objectToUrl = ({ baseUrl, data = {} }) => {
  data = decamelize(data)

  const dataProperties = Object.keys(data)
    .map(key => {
      const value = data[key] && data[key].hasOwnProperty.call(data[key], 'value') ? data[key].value : data[key]
      return { key, value }
    })
    .filter(property => property.value !== null)

  const urlObject = new URLSearchParams()
  dataProperties.forEach(property => {
    urlObject.append(property.key, property.value)
  })

  return `${baseUrl}?${urlObject.toString()}`
}

export { objectToUrl }
