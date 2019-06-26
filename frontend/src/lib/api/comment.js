import axios from "axios";

export const write = ({ token, body, postid }) =>
  axios.post("http://localhost:4000/api/comment/write",
    {
        body: body,
        post: postid
    },
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
});

export const list = ({token, postid}) => 
  axios.get("http://localhost:4000/api/comment/list/"+postid,
  {
    headers: {
      'token': token
  }
});