import axios from 'axios'

// baseURL:'http://localhost:7060/'
const clienteAxios = axios.create({
    baseURL:'https://rest-api-production-f396.up.railway.app/api'
})

export default clienteAxios