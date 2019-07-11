import { observable, action } from 'mobx';
import * as authApi from 'lib/api/auth';

class userStore {
  @observable token = null;
  @observable thumbnail = null;
  @observable following =[];
  @observable follower = [];
  @observable username = null;
  @observable _id = null;
  @observable state = "pending";

  constructor() {
    this.token = localStorage['dotia-token']
    this.getUserProfile();
  }

  
  @action.bound
  Login(){
    this.token = localStorage['dotia-token'];
    this.getUserProfile();
  }

  @action.bound
  getUserProfile() {
    const { token } = this;
    if( token === undefined || token === null ) {
      return Promise.resolve(false);
    }
    authApi.checkStatus({ token })
    .then((result) => {
      // console.log('store 인증 성공');
      // console.log(result)
      this.setUserProfile(result);
    })
    .catch((result) => {
        console.log(result);
        console.log('store 인증 실패');
    });
  }

  @action
  setUserProfile(result) {
      const profile = result.data.profile;

      this._id = result.data._id;
      this.thumbnail = profile.thumbnail;
      this.following = profile.following;
      this.follower = profile.follower;
      this.username = profile.username;
      console.log(this);
      this.state = "done";
  }
}

export default userStore