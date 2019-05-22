// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const WhiteBox = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    margin: auto;
    width: 100px;
    height: 100px;
    z-index: 30;
    background-color: white;
    transform: translate(-50%);
`

class WritePost extends React.Component{
    render(){
        return(
            <WhiteBox>
                a
            </WhiteBox>
        )
    }
}

export default WritePost;