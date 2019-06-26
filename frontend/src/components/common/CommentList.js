// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './Comment';
import CommentInput from './CommentInput';

import * as commentApi from 'lib/api/comment';

import Img1 from "testimg/img1.gif";
import Img2 from "testimg/img13.gif";
import Img3 from "testimg/img14.png";
import Img4 from "testimg/img8.gif";

const Wrapper = styled.div`
    ${ props => {
        return props.watchComment?`display: block`:`display: none`;
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
    state = {
        commentList: []
    }

    componentDidMount(){
        commentApi.list({postid: this.props.postid})
        .then((result) => {
            this.setState({
                commentList: result.data
            });
        })
        .catch((result) => {
            console.log(result);
        })
    }


    render(){
        const { watchComment } = this.props;

        return(
            <Wrapper watchComment={watchComment}>
                {this.state.commentList.map((comment, index) => 
                    <Comment 
                        authorThumbnail={comment.authorThumbnail}
                        authorUsername={comment.authorUsername}
                        body={comment.body}
                        writed={comment.writed}
                        key={index}
                    />
                )}
                <CommentInput postid={this.props.postid}/>
            </Wrapper>
        )
    }
}

export default CommentList;