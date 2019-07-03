// @flow
import React from 'react';
import styled from 'styled-components';
import Post from 'components/common/Post';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    position: fixed;
    z-index: 20;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`

const Background = styled.div`
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`



const PostContainer = ({ match, location, history}) => {
    return (
        <Wrapper>
            <Background onClick={history.goBack}/>
            <Post postid={match.params.postid} index={location.state?location.state.index:null}/>
        </Wrapper>
    )
    
}

export default PostContainer;