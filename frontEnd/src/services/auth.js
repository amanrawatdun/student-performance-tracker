import API from './api'

export const signup =(data)=>API.post('/teacher/signup',data);
export const login=(data)=>API.post('/teacher/login',data);