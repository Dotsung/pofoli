import axios from 'axios';

export const localRegister = ({email, username, password}) => axios.post('http://localhost:4000/api/auth/register/local', { email, username, password });
export const localLogin = ({email, password}) => axios.post('http://localhost:4000/api/auth/login/local', { email, password });

export const checkStatus = () => axios.get('http://localhost:4000/api/auth/check');