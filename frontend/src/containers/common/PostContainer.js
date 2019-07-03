// @flow
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Post from 'components/common/Post';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    position: fixed;
    z-index: 30;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`

const Background = styled.div`
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    z-index: 25;
`

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: hidden;
  }
`

const PostContainer = ({ match, location, history}) => {
    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <Post postid={match.params.postid} index={location.state?location.state.index:null} history={history}/>
        </Wrapper>
        <Background/>
        </>
    )
    
}

export default PostContainer;