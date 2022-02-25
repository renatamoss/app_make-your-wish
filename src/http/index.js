import axios from 'axios'

const http = axios.create({
    // baseURL: 'https://api-login-make-your-wish.herokuapp.com/',
    baseURL: 'http://localhost:8000/',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

export default http