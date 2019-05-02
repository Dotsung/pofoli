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
import Img5 from 'testimg/img5.jpg';
import Img6 from 'testimg/img6.png';
import Img9 from 'testimg/img9.gif';
import Img8 from 'testimg/img8.jpg';

const CardList = [
    {
        title: "penguin",
        author: "uu",
        img: Img1,
        hearts: 35,
        views: 243
    }
]

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

class PostCardList extends React.Component{
    render(){
        return(
            <Wrapper>
                <PostCard img={Img1}/>
                <PostCard img={Img2}/>
                <PostCard img={Img3}/> 
                <PostCard img={Img4}/>
                <PostCard img={Img5}/>
                <PostCard img={Img6}/>
                <PostCard img={Img9}/> 
                <PostCard img={Img8}/>
                <PostCard/>
            </Wrapper>
        )
    }
}

export default PostCardList;