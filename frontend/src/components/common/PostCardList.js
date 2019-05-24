// @flow
import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

import PostCard from "./PostCard";
import PostContainer from "containers/common/PostContainer";
import * as postApi from 'lib/api/post';

import Img1 from "testimg/img1.gif";
import Img2 from "testimg/img2.jpg";
import Img3 from "testimg/img3.gif";
import Img4 from "testimg/img4.gif";
import Img5 from "testimg/img5.gif";
import Img6 from "testimg/img6.png";
import Img7 from "testimg/img7.gif";
import Img8 from "testimg/img8.gif";
import Img9 from "testimg/img9.gif";
import Img10 from "testimg/img10.gif";
import Img11 from "testimg/img11.gif";
import Img12 from "testimg/img12.jpg";
import Img13 from "testimg/img13.gif";
import Img14 from "testimg/img14.png";

const CardList = [
  {
    id: 1,
    title: "Lorem",
    date: "2019.03.04",
    author: "uu",
    body: "lorem ipsum",
    img: Img1,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(true),
    stared: Boolean(true)
  },
  {
    id: 2,
    title: "Ipsum",
    date: "2019.03.05",
    author: "uu",
    body: "lorem ipsum",
    img: Img2,
    hearts: 45,
    views: 643,
    comments: 12,
    stars: 24,
    hearted: Boolean(Boolean(false)),
    stared: Boolean(Boolean(false))
  },
  {
    id: 3,
    title: "Dolor",
    date: "2019.03.06",
    author: "uu",
    body: "lorem ipsum",
    img: Img3,
    hearts: 3,
    views: 43,
    comments: 3,
    stars: 2,
    hearted: Boolean(Boolean(false)),
    stared: Boolean(Boolean(false))
  },
  {
    id: 4,
    title: "Shit",
    date: "2019.03.07",
    author: "uu",
    body: "lorem ipsum",
    img: Img4,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 5,
    title: "Amet",
    date: "2019.03.08",
    author: "uu",
    body: "lorem ipsum",
    img: Img5,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 6,
    title: "Consectetur",
    date: "2019.03.09",
    author: "uu",
    body: "lorem ipsum",
    img: Img6,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 7,
    title: "Adipiscing",
    date: "2019.03.10",
    author: "uu",
    body: "lorem ipsum",
    img: Img7,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 8,
    title: "Elit",
    date: "2019.03.11",
    author: "uu",
    body: "lorem ipsum",
    img: Img8,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 9,
    title: "Sed",
    date: "2019.03.12",
    author: "uu",
    body: "lorem ipsum",
    img: Img9,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 10,
    title: "Do",
    date: "2019.03.13",
    author: "uu",
    body: "lorem ipsum",
    img: Img10,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 11,
    title: "Eiusmod",
    date: "2019.03.14",
    author: "uu",
    body: "lorem ipsum",
    img: Img11,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 12,
    title: "Tempor",
    date: "2019.03.15",
    author: "uu",
    body: "lorem ipsum",
    img: Img12,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 13,
    title: "Tempor",
    date: "2019.03.15",
    author: "uu",
    body: "lorem ipsum",
    img: Img13,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  },
  {
    id: 14,
    title: "Tempor",
    date: "2019.03.15",
    author: "uu",
    body: "lorem ipsum",
    img: Img14,
    hearts: 35,
    views: 243,
    comments: 4,
    stars: 13,
    hearted: Boolean(false),
    stared: Boolean(false)
  }
];

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

class PostCardList extends React.Component {
  state = {
    data: [],
    page: 1
  }
  
  componentDidMount() {
    postApi.list({page: this.state.page})
    .then((result) => {
      console.log('list불러오기 성공');
      this.setState({
        data: result.data
      })
      console.log(this.state.data)
    })
    .catch((result) => {
      console.log('list err');
      console.log(result);
    })
  }

  loadMore = () => {
      this.setState({
        page: this.state.page + 1
      },
      () =>
        postApi.list({page: this.state.page})
        .then((result) => {
          console.log('list추가 성공');
          console.log(this.state.page);
          console.log(result);
          this.setState({
            data: this.state.data.concat(result.data)
          })
          console.log(this.state.data)
        })
        .catch((result) => {
          console.log('list추가 에러');
          console.log(result);
        })
      )
  }
  
  render() {
    const CardList = this.state.data;
    return (
      <>
      <Route path='/post/:postid' component={PostContainer}/>
        <CardListWrapper>
          {CardList.map((card, index) => (
            <PostCard
              id={card._id}
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
            />
          ))}
        </CardListWrapper>
        <LoadMoreButton onClick={this.loadMore}>Load More</LoadMoreButton>
      </>
    );
  }
}

export default PostCardList;
