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

export const list = ({page}) => 
  axios.get("http://localhost:4000/api/post/list/"+page);