import axios from "axios";

import {
LOGIN_USER,
REGISTER_USER,
} from './types'

export function loginUser(data){
    const req = axios.post('/api/users/login', data)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload:req,
    }
}

export function registerUser(data){
    const req = axios.post('/api/users/register', data)
    .then(response => response.data)
    return {
        type: REGISTER_USER,
        payload:req,
    }
}
