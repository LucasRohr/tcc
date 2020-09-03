import { EXCEPTIONS, DEFAULT_EXCEPTION } from 'app-constants'

export class RequestError {
  constructor({ message, code }) {
    this.message = EXCEPTIONS[code]
    this.code = code

    if (!this.message) {
      throw new Error(DEFAULT_EXCEPTION)
    }
  }
}
