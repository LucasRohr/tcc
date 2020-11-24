import axios from 'axios'

const DEFAULT_REQUEST_TIMEOUT = 90000
const API_URL = 'https://localhost:8763'

const https = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
})

export { https }
