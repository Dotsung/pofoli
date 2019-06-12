import { observable, action } from 'mobx';
import * as authApi from 'lib/api/auth';

class userStore {
  @observable token = null;
  @observable thumbnail = null;
  @observable hearted = null;
  @observable stared = null;
  @observable following = null;
  @observable follower = null;
  @observable username = null;
  @observable _id = null;

  constructor() {
    this.token = localStorage['dotia-token']
    this.setUserProfile();
  }

  
  @action.bound
  Login(){
    this.token = localStorage['dotia-token'];
    this.setUserProfile();
  }

  setUserProfile() {
    const { token } = this
    authApi.checkStatus({ token })
    .then((result) => {
      // console.log('store 인증 성공');
      // console.log(result)
      const profile = result.data.profile;

      this._id = result.data._id;
      this.thumbnail = profile.thumbnail;
      this.hearted = profile.hearted;
      this.stared = profile.stared;
      this.following = profile.following;
      this.follower = profile.follower;
      this.username = profile.username;
      console.log(this)
    })
    .catch((result) => {
        console.log(result);
        console.log('store 인증 실패');
    });
  }
}

export default userStore