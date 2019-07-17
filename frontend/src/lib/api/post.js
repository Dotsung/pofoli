import axios from "axios";

import { backendPATH } from './env';

export const write = ({ token, formData }) =>
  axios.post(backendPATH+"/api/post/write",
    formData,
    {
      headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
    }
  });

export const list = ({token, page}) => 
  axios.get(backendPATH+"/api/post/list/"+page,
  {
    headers: {
      'token': token
  }
});

export const userPostList = ({token, username, page}) =>
  axios.get(backendPATH+"/api/post/userlist/"+username+'/'+page,
  {
    headers: {
      'token': token
  }
});

export const heartPostList = ({token, username, page}) =>
  axios.get(backendPATH+"/api/post/heartlist/"+username+'/'+page,
  {
    headers: {
      'token': token
  }
});

export const starPostList = ({token, username, page}) =>
  axios.get(backendPATH+"/api/post/starlist/"+username+'/'+page,
  {
    headers: {
      'token': token
  }
});

export const heart = ({token, postid}) =>
  axios.post(backendPATH+"/api/post/heart",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const unheart = ({token, postid}) =>
  axios.post(backendPATH+"/api/post/unheart",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const star = ({token, postid}) =>
  axios.post(backendPATH+"/api/post/star",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });

export const unstar = ({token, postid}) =>
  axios.post(backendPATH+"/api/post/unstar",
  {
    postid: postid
  },
  {
    headers: {
      'token': token
    }
  });


export const read = ({token, postid}) => 
  axios.get(backendPATH+"/api/post/read/"+postid,
  {
    headers: {
      'token': token
  }
});