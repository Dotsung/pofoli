// @flow
import React from 'react';
import styled from 'styled-components';
import Post from 'components/common/Post';
import oc from 'open-color';
import WritePost from 'components/WritePost';

const Wrapper = styled.div`
    position: fixed;
    z-index: 30;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`

const Background = styled.div`
    position: fixed; /* Stay in place */
    z-index: 25;
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
`

class WritePostContainer extends React.Component {
    render(){
        return (
            <Wrapper>
                <Background/>
                <WritePost/>
            </Wrapper>
        )
    }
}

export default WritePostContainer;