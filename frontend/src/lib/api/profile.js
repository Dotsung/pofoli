import axios from "axios";

export const getProfile = ({ username }) =>
  axios.get("http://localhost:4000/api/profile/get/"+username);