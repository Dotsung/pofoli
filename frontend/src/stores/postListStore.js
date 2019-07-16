import { observable, action } from 'mobx';
import * as postApi from 'lib/api/post';

class postListStore {
    @observable token = null;
    @observable postList = [];
    @observable page = 1;
    @observable state = "pending";

  constructor() {
      this.token = localStorage['dotia-token'];
  }

  @action.bound
  Login = () => {
    this.token = localStorage['dotia-token'];
    this.getList();
  }

  @action.bound
  getList = () => {
    postApi.list({token: this.token, page: this.page})
    .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = result.data;
      this.state = "done";
      this.state = "update";
      //console.log(this.state.data)
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  loadMore = () => {
    this.page = this.page + 1;
    postApi.list({token: this.token, page: this.page})
    .then((result) => {
        //console.log('list불러오기 성공');
        this.postList = this.postList.concat(result.data);
        this.state = "done";
        this.state = "update";
        //console.log(this.state.data)
    })
    .catch((result) => {
        console.log('list store err');
        console.log(result);
    });
  }

  @action.bound
  getUserPostList = ({username}) => {
    postApi.userPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
      this.state = "update";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  getHeartPostList = ({username}) => {
    postApi.heartPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
      this.state = "update";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  getStarPostList = ({username}) => {
    postApi.starPostList({token: this.token, username:username ,page: this.page})
    .then((result) => {
      this.postList = result.data;
      this.state = "done";
      this.state = "update";
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  deleteList = () => {
    this.postList = [];
  }

  @action.bound
  loadMore = () => {
    this.page = this.page + 1;
    postApi.list({token: this.token, page: this.page})
    .then((result) => {
        //console.log('list불러오기 성공');
        this.postList = this.postList.concat(result.data);
        this.state = "done";
        this.state = "update";
        //console.log(this.state.data)
    })
    .catch((result) => {
        console.log('list store err');
        console.log(result);
    });
  }

  @action.bound
  getPost = ({ index }) => {
    return this.postList[index];
  }

  @action.bound
  heart = ({ index }) => {
      this.postList[index].hearted = true;
      this.postList[index].hearts += 1;
  }


  @action.bound
  unheart = ({ index }) => {
      this.postList[index].hearted = false;
      this.postList[index].hearts -= 1;
  }


  @action.bound
  star = ({ index }) => {
      this.postList[index].stared = true;
      this.postList[index].stars += 1;
  }

  @action.bound
  unstar = ({ index }) => {
      this.postList[index].stared = false;
      this.postList[index].stars -= 1;
  }
}

export default postListStore