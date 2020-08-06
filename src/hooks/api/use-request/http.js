import axios from 'axios'

const API_URL = 'http://localhost:8763'
const DEFAULT_REQUEST_TIMEOUT = 90000

const http = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
})

export { http }
