import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER
} from './types'

export function loginUser(dataToSubmit) {
    const request = axios.post(`https://online-shop-mern-boilerplate.vercel.app/api/users/login`, dataToSubmit)
        .then(res => res.data);

    return {
        type: 'LOGIN_USER',
        payload: request
    }

}

export function registerUser(dataToSubmit) {
    const request = axios.post(`https://online-shop-mern-boilerplate.vercel.app/api/users/register`, dataToSubmit)
        .then(resp => resp.data);

    return {
        type: 'REGISTER_USER',
        payload: request
    }
}