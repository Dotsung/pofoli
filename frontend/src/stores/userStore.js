import { observable, action } from 'mobx';
import * as authApi from 'lib/api/auth';

class userStore {
  @observable token
  @observable thumbnail
  @observable hearted
  @observable stared
  @observable following
  @observable follower
  @observable username

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

      this.thumbnail = profile.thumbnail;
      this.hearted = profile.hearted;
      this.stared = profile.stared;
      this.following = profile.following;
      this.follower = profile.follower;
      this.username = profile.username;
    })
    .catch((result) => {
        console.log(result);
        console.log('store 인증 실패');
        this.thumbnail = null;
        this.hearted = null;
        this.stared = null;
        this.following = null;
        this.follower = null;
        this.username = null;
    });
  }
}

export default userStore