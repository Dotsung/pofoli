import { observable, action } from 'mobx';

class userStore {
  @observable token

  constructor() {
    this.token = localStorage['dotia-token']
  }

  @action.bound
  Login(){
    this.token = localStorage['dotia-token']
  }
}

export default userStore