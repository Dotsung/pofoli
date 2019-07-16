import axios from "axios";

export const localRegister = ({ email, username, password }) =>
  axios.post("http://localhost:4000/api/auth/register/local", {
    email,
    username,
    password
  });
export const localLogin = ({ email, password }) =>
  axios.post("http://localhost:4000/api/auth/login/local", { email, password });

export const checkStatus = ({ token }) =>
  axios.get("http://localhost:4000/api/auth/check",
  {
      headers: {
          'token': token
      }
  });

export const updateThumbnail = ({ token, formData }) => 
  axios.post("http://localhost:4000/api/auth/updatethumbnail",
  formData,
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
});


export const findUserById = ({ id }) => 
  axios.get("http://localhost:4000/api/auth/findUser/"+id);