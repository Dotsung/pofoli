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

export const list = ({token, page}) => 
  axios.get("http://localhost:4000/api/post/list/"+page,
  {
    headers: {
      'token': token
  }
});

export const heart = ({token, postid}) =>
  axios.post("http://localhost:4000/api/post/heart",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const unheart = ({token, postid}) =>
  axios.post("http://localhost:4000/api/post/unheart",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const star = ({token, postid}) =>
  axios.post("http://localhost:4000/api/post/star",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const unstar = ({token, postid}) =>
  axios.post("http://localhost:4000/api/post/unstar",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });


export const read = ({token, id}) => 
  axios.get("http://localhost:4000/api/post/read/"+id,
  {
    headers: {
      'token': token
  }
});