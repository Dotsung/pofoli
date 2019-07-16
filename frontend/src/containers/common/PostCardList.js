// @flow
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import oc from "open-color";
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import PostCard from "components/common/PostCard";
import PostContainer from "containers/common/PostContainer";
import WritePostContainer from 'containers/WritePostContainer';

const CardListWrapper = styled.div`
  column-count: 6;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: hidden;

  @media (max-width: 1920px) {
    column-count: 5;
  }
  @media (max-width: 1600px) {
    column-count: 4;
  }
  @media (max-width: 1200px) {
    column-count: 3;
  }
  @media (max-width: 900px) {
    column-count: 2;
  }
  @media (max-width: 700px) {
    column-count: 1;
  }
`;

const LoadMoreButton = styled.button`
  display: block;
  width: 80%;
  margin: 2rem auto;
  border: 1px solid #000000;
  height: 2rem;
`

const NewPostButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  font-size: 3rem;
  z-index: 15;
  display: block;
  background-color: ${oc.indigo[6]};
  color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover{
    background-color: ${oc.indigo[8]};
    color: ${oc.gray[3]};
  }
  &:focus{
    outline: 0;
  }
`

const NewPostButtonTextWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
`

const NewPostButtonText = styled.p`
  display: block;
  position: absolute;
  margin: 0;
  top: -2px;
  left: 5px;
`

const PostCardList = ({postList, loadMore, getList, deleteList, getUserPostList, getHeartPostList, getStarPostList, match}) => {

  useEffect(() => {
    deleteList();
    if(match){
      switch (match.params.category) {
        case 'posts':
          getUserPostList({username: match.params.username});
          break;
        case 'hearts':
          getHeartPostList({username: match.params.username});
          break;
        case 'stars':
          getStarPostList({username: match.params.username});
          break;
        default:
          break;
      }
    } else {
      getList();
    }
  },[match?match.params.category:null]);

  const NavRoute = () => {
    if(match){
      return <Route path={'/user/'+match.params.username+'/'+match.params.category+'/post/:postid'} component={PostContainer}/>
    }
  }

  return (
    <>
    <Route path='/post/:postid' component={PostContainer}/>
    {NavRoute()}
    <Route path='/write' component={WritePostContainer}/>
    <CardListWrapper>
      {postList.map((card, index) => (
        <PostCard
          id={card._id}
          index={index}
          title={card.title}
          date={dateFormat(new Date(card.createdAt),"isoDate")}
          author={card.author}
          body={card.body}
          img={card.image}
          authorThumbnail={card.authorThumbnail}
          authorUsername={card.authorUsername}
          hearted={card.hearted}
          stared={card.stared}
          hearts={card.hearts}
          views={card.views}
          comments={card.comments}
          stars={card.stars}
          key={index}
        />)
      )}
    </CardListWrapper>
    <Link to="/write">
      <NewPostButton>
        <NewPostButtonTextWrapper>
          <NewPostButtonText>+</NewPostButtonText>
        </NewPostButtonTextWrapper>
      </NewPostButton>
    </Link>
    <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
    </>
  );
}

export default inject(({ postListStore }) => ({
  postList: postListStore.postList,
  loadMore: postListStore.loadMore,
  getList: postListStore.getList,
  deleteList: postListStore.deleteList,
  getUserPostList: postListStore.getUserPostList,
  getHeartPostList: postListStore.getHeartPostList,
  getStarPostList: postListStore.getStarPostList
}))(observer(PostCardList));