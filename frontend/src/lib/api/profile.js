import axios from "axios";

export const getProfile = ({ username }) =>
  axios.get("http://localhost:4000/api/profile/get/"+username);

export const updateThumbnail = ({ token, formData }) => 
  axios.post("http://localhost:4000/api/profile/updatethumbnail",
  formData,
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
});