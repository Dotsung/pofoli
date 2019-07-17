import axios from "axios";

import { backendPATH } from './env';

export const localRegister = ({ email, username, password }) =>
  axios.post(backendPATH+"/api/auth/register/local", {
    email,
    username,
    password
  });
export const localLogin = ({ email, password }) =>
  axios.post(backendPATH+"/api/auth/login/local", { email, password });

export const checkStatus = ({ token }) =>
  axios.get(backendPATH+"/api/auth/check",
  {
      headers: {
          'token': token
      }
  });

export const findUserById = ({ id }) => 
  axios.get(backendPATH+"/api/auth/findUser/"+id);