// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    padding: 3rem;
    text-align: center;
`

const H1 = styled.h1`
    margin: 0;
`

class WritePost extends React.Component{
    render(){
        return(
            <Wrapper>
                <H1>New Post</H1>
            </Wrapper>
        )
    }
}

export default WritePost;