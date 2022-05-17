import axios from 'axios'
import cookies from 'react-cookies'

export const endpoints = {
    "tours": "/tours/",
    "tour-detail": (tourId) => `/tours/${tourId}/`,
    "login": "/o/token/",
    "signup": "/users/",
    "current-user": "/users/current-user/",
    "comments-tour": (tourId) =>  `/tours/${tourId}/comments`,
    "comments": "/comments/"
}

export const authApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:8000/"
})