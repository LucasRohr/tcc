import axios from 'axios'

const DEFAULT_REQUEST_TIMEOUT = 90000
const API_URL = 'https://10.0.0.6:8763'

const https = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
})

export { https }
