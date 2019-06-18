import UserStore from './userStore'
import PostListStore from './postListStore';

export const stores = {
    userStore: new UserStore(),
    postListStore: new PostListStore()
}