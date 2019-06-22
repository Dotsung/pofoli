import { observable, action } from 'mobx';
import * as authApi from 'lib/api/auth';

class userStore {
  @observable token = null;
  @observable thumbnail = null;
  @observable hearted = [];
  @observable stared = [];
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
      this.hearted = profile.hearted;
      this.stared = profile.stared;
      this.following = profile.following;
      this.follower = profile.follower;
      this.username = profile.username;
      this.state = "done";
  }

  @action.bound
  star(id){
    if(this.stared.indexOf(id) === -1){
      this.stared.push(id)
    }
  }

  @action.bound
  unstar(id){
    var index = this.stared.indexOf(id);
    if (index > -1) {
      this.stared.splice(index, 1);
    }
    console.log(this.stared)
  }

  @action.bound
  heart(id){
    if(this.hearted.indexOf(id) === -1){
      this.hearted.push(id)
    }
  }

  @action.bound
  unheart(id){
    console.log('tes')
    var index = this.hearted.indexOf(id);
    if (index > -1) {
      this.hearted.splice(index, 1);
    }
  }

}

export default userStore