import axios from 'axios'

const clienteAxios = axios.create({
    baseURL:'http://localhost:7060/'
})

export default clienteAxios