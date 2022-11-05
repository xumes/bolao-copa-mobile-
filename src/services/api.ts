import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.4.23:3333'
})