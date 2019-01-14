import axios from 'axios'
// rest api calls?
export default() => {
  return axios.create({
    baseURL: `http://localhost:8081/api`
  })
}
