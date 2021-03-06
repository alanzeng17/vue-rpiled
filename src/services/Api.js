import axios from 'axios'
export default() => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://2c6c338e092dbe1c0433d3d4fdae1a28.balena-devices.com/api' : 'http://localhost:8081/api',
    headers: {'Access-Control-Allow-Origin': '*'}
  })
}
