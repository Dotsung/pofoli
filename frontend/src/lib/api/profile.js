import axios from "axios";

export const heart = ({ _id, postid }) =>
  axios.post("http://localhost:4000/api/profile/heart", {
      _id,
      postid
});

export const unheart = ({ _id, postid }) =>
  axios.post("http://localhost:4000/api/profile/unheart", {
      _id,
      postid
});