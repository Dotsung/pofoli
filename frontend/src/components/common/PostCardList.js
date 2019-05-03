// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import PostCard from './PostCard';

import Img1 from 'testimg/img1.gif';
import Img2 from 'testimg/img2.jpg';
import Img3 from 'testimg/img3.png';
import Img4 from 'testimg/img4.gif';
import Img5 from 'testimg/img5.gif';
import Img6 from 'testimg/img6.png';
import Img7 from 'testimg/img7.gif';
import Img8 from 'testimg/img8.jpg';
import Img9 from 'testimg/img9.gif';
import Img10 from 'testimg/img10.gif';
import Img11 from 'testimg/img11.gif';
import Img12 from 'testimg/img12.gif';

const CardList = [
    {
        title: "Lorem",
        date: "2019.03.04",
        author: "uu",
        img: Img1,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "ipsum",
        date: "2019.03.05",
        author: "uu",
        img: Img2,
        hearts: 45,
        views: 643,
        comments: 12,
        stars: 24
    },
    {
        title: "dolor",
        date: "2019.03.06",
        author: "uu",
        img: Img3,
        hearts: 3,
        views: 43,
        comments: 3,
        stars: 2
    },
    {
        title: "shit",
        date: "2019.03.07",
        author: "uu",
        img: Img4,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "amet",
        date: "2019.03.08",
        author: "uu",
        img: Img5,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "consectetur",
        date: "2019.03.09",
        author: "uu",
        img: Img6,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "adipiscing",
        date: "2019.03.10",
        author: "uu",
        img: Img7,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "elit",
        date: "2019.03.11",
        author: "uu",
        img: Img8,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "sed",
        date: "2019.03.12",
        author: "uu",
        img: Img9,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "do",
        date: "2019.03.13",
        author: "uu",
        img: Img10,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "eiusmod",
        date: "2019.03.14",
        author: "uu",
        img: Img11,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
    {
        title: "tempor",
        date: "2019.03.15",
        author: "uu",
        img: Img12,
        hearts: 35,
        views: 243,
        comments: 4,
        stars: 13
    },
]

const Wrapper = styled.div`
    column-count: 5;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`

class PostCardList extends React.Component{
    render(){
        return(
            <Wrapper>
                {CardList.map((card, index)=>
                <PostCard 
                    title={card.title}
                    date={card.date}
                    author={card.author}
                    img={card.img}
                    hearts={card.hearts}
                    views={card.views}
                    comments={card.comments}
                    stars={card.stars}
                /> 
                )}
            </Wrapper>
        )
    }
}

export default PostCardList;