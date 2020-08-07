import axios from 'axios'

const API_URL = 'https://localhost:8080'
const DEFAULT_REQUEST_TIMEOUT = 90000

const https = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
})

export { https }
