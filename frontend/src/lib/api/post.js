import axios from "axios";

export const write = ({ token, formData }) =>
  axios.post("http://localhost:4000/api/post/write",
    formData,
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
  });

export const list = ({ email, password }) =>
  axios.post("http://localhost:4000/api/auth/login/local", { email, password });

export const checkStatus = ({ token }) =>
  axios.get("http://localhost:4000/api/auth/check",
  {
      headers: {
          'token': token
      }
  });