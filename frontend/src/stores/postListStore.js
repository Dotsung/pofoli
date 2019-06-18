import { observable, action } from 'mobx';
import * as postApi from 'lib/api/post';

class postListStore {
    @observable postList = [];
    @observable page = 1;

  constructor() {
    this.getUserProfile();
  }


  @action.bound
  getList() {
    postApi.list({page: this.page})
    .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = result.data;
      //console.log(this.state.data)
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  loadMore(){
    this.page = this.page + 1;
    postApi.list({page: this.page})
    .then((result) => {
        //console.log('list불러오기 성공');
        this.postList = this.postList.concat(result.data);
        //console.log(this.state.data)
    })
    .catch((result) => {
        console.log('list store err');
        console.log(result);
    });
  }
}

export default postListStore