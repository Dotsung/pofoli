// @flow
import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { observer, inject } from 'mobx-react';

import PostCard from "./PostCard";
import PostContainer from "containers/common/PostContainer";
import * as postApi from 'lib/api/post';

const CardListWrapper = styled.div`
  column-count: 6;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

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

@inject('userStore')
@inject('postListStore')
@observer
class PostCardList extends React.Component {
  state = {
    data: [],
    page: 1
  }
  
  // componentDidMount() {
  //   postApi.list({page: this.state.page})
  //   .then((result) => {
  //     this.setState({
  //       data: result.data
  //     })
  //   })
  //   .catch((result) => {
  //     console.log('list err');
  //     console.log(result);
  //   });
  // }

  // loadMore = () => {
  //     this.setState({
  //       page: this.state.page + 1
  //     },
  //     () =>
  //       postApi.list({page: this.state.page})
  //       .then((result) => {
  //         console.log('list추가 성공');
  //         console.log(this.state.page);
  //         console.log(result);
  //         this.setState({
  //           data: this.state.data.concat(result.data)
  //         })
  //         console.log(this.state.data)
  //       })
  //       .catch((result) => {
  //         console.log('list추가 에러');
  //         console.log(result);
  //       })
  //     )
  // }

  render() {
    //const CardList = this.state.data;
  
    return (
      <>
      <Route path='/post/:postid' component={PostContainer}/>
        <CardListWrapper>
          {this.props.postListStore.postList.map((card, index) => (
            <PostCard
              id={card._id}
              index={index}
              title={card.title}
              date={dateFormat(new Date(card.updatedAt),"isoDate")}
              author={card.author}
              body={card.body}
              img={card.image}
              authorThumbnail={card.authorThumbnail}
              authorUsername={card.authorUsername}
              hearts={card.hearts}
              views={card.views}
              comments={card.comments}
              stars={card.stars}
              key={index}
            />)
          )}
        </CardListWrapper>
        <LoadMoreButton onClick={this.loadMore}>Load More</LoadMoreButton>
      </>
    );
  }
}

export default PostCardList;