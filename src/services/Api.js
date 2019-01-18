import axios from 'axios'
// rest api calls?
export default() => {
  return axios.create({
    baseURL: 'https://2c6c338e092dbe1c0433d3d4fdae1a28.balena-devices.com/api',
    // baseURL: 'http://localhost:8081/api',
    headers: {'Access-Control-Allow-Origin': '*'}
  })
}
