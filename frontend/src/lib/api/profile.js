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

export const star = ({ _id, postid }) =>
  axios.post("http://localhost:4000/api/profile/star", {
      _id,
      postid
});

export const unstar = ({ _id, postid }) =>
  axios.post("http://localhost:4000/api/profile/unstar", {
      _id,
      postid
});