// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import PostCard from './PostCard';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

class PostCardList extends React.Component{
    render(){
        return(
            <Wrapper>
                <PostCard/>
                <PostCard/>
                <PostCard/> 
                <PostCard/>
                <PostCard/>
                <PostCard/> 
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </Wrapper>
        )
    }
}

export default PostCardList;