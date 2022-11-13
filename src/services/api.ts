import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://xumes-bolao-copa.herokuapp.com'
})