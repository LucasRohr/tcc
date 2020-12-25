import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const DEFAULT_REQUEST_TIMEOUT = 90000

const https = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
})

export { https }
