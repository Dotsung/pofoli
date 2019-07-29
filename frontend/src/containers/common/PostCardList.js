import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import oc from "open-color";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

import PostCard from "components/common/PostCard";
import PostContainer from "containers/common/PostContainer";
import WritePostContainer from "containers/WritePostContainer";
import WritePostButton from "components/common/WritePostButton";

import "./PostCardList.css";

const CardListWrapper = styled.div`
  /* column-count: 6;
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
  } */
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  display: grid;
  grid-row-gap: 1px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1px;
`;

const LoadMoreButton = styled.button`
  display: block;
  width: 80%;
  margin: 2rem auto;
  border: 1px solid #000000;
  height: 2rem;
`;

const NewPostButtonTextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const NewPostButtonText = styled.p`
  width: 250px;
  height: 50px;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  line-height: 50px;
  text-align: center;
`;

const LodingSection = styled.div`
  display: ${props => (props.loading ? `bolck` : `none`)};
`;

const PostCardList = ({
  postList,
  loadMore,
  getList,
  deleteList,
  getUserPostList,
  getHeartPostList,
  getStarPostList,
  match,
  state
}) => {
  useEffect(() => {
    deleteList();
    if (match) {
      switch (match.params.category) {
        case "posts":
          getUserPostList({ username: match.params.username });
          break;
        case "hearts":
          getHeartPostList({ username: match.params.username });
          break;
        case "stars":
          getStarPostList({ username: match.params.username });
          break;
        default:
          break;
      }
    } else {
      getList();
    }
  }, [match ? match.params.category : null]);

  const NavRoute = () => {
    if (match) {
      return (
        <Route
          path={
            "/user/" +
            match.params.username +
            "/" +
            match.params.category +
            "/post/:postid"
          }
          component={PostContainer}
        />
      );
    }
  };

  const CardListEl = useRef(null);
  return (
    <>
      <Route path="/post/:postid" component={PostContainer} />
      {NavRoute()}
      <Route path="/write" component={WritePostContainer} />
      <CardListWrapper ref={CardListEl}>
        {postList.map((card, index) => (
          <PostCard
            id={card._id}
            index={index}
            title={card.title}
            date={dateFormat(new Date(card.createdAt), "yyyy.mm.dd")}
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
            listRef={CardListEl}
          />
        ))}
      </CardListWrapper>
      <LodingSection loading={state === "pending" ? 1 : 0}>
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </LodingSection>
      <WritePostButton />
      <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
    </>
  );
};

export default inject(({ postListStore }) => ({
  postList: postListStore.postList,
  state: postListStore.state,
  loadMore: postListStore.loadMore,
  getList: postListStore.getList,
  deleteList: postListStore.deleteList,
  getUserPostList: postListStore.getUserPostList,
  getHeartPostList: postListStore.getHeartPostList,
  getStarPostList: postListStore.getStarPostList
}))(observer(PostCardList));
