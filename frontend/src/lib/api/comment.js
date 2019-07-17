import axios from "axios";

import { backendPATH } from './env';

export const write = ({ token, body, postid }) =>
  axios.post(backendPATH+"/api/comment/write",
    {
        body: body,
        postid: postid
    },
    {
      headers: {
          'token': token
    }
});

export const list = ({token, postid}) => 
  axios.get(backendPATH+"/api/comment/list/"+postid,
  {
    headers: {
      'token': token
  }
});