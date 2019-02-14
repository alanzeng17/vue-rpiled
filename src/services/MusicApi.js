import axios from 'axios'
export default() => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8888/api' : 'http://localhost:8888/api',
    headers: {'Access-Control-Allow-Origin': '*'}
  })
}
