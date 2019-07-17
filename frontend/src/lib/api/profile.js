import axios from "axios";

import { backendPATH } from './env';

export const getProfile = ({ username }) =>
  axios.get(backendPATH+"/api/profile/get/"+username);

export const updateThumbnail = ({ token, formData }) => 
  axios.post(backendPATH+"/api/profile/updatethumbnail",
  formData,
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
});

export const updateInfo = ({ token, introduction, email, site }) => 
  axios.post(backendPATH+"/api/profile/updateinfo",
  {
    introduction: introduction,
    email: email,
    site: site
  },
  {
    headers: {
        'token': token
  }
});