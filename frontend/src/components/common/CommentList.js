// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './Comment';

import Img1 from "testimg/img1.gif";
import Img2 from "testimg/img13.gif";
import Img3 from "testimg/img14.png";
import Img4 from "testimg/img8.gif";

const Wrapper = styled.div`
    ${ props => {
        return props.watchComment?`display: block`:`display: none`
    }}
    padding: 5px 30px;
`

const Slicer = styled.div`
    width: 100%;
    margin: 0;
    height: 0.2rem;
    background-color: ${oc.indigo[3]};
    margin-bottom: 1rem;
`

class CommentList extends React.Component{
    render(){
        const { img, watchComment } = this.props;
        return(
            <Wrapper watchComment={watchComment}>
                <Comment img={Img1} author={`Dosung`} desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}/>
                <Comment img={Img2} author={`Haya`} desc={`Ut enim ad minim veniam`}/>
                <Comment img={Img3} author={`choicyle`} desc={`quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}/>
                <Comment img={Img4} author={`DMB`} desc={`Excepteur sint occaecat cupidatat non proident`}/>
            </Wrapper>
        )
    }
}

export default CommentList;