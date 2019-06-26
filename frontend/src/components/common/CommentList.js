// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Comment from './Comment';
import CommentInput from './CommentInput';

import * as commentApi from 'lib/api/comment';

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

    appendComment = ({ authorThumbnail, authorUsername, body }) => {
        this.setState({
            commentList: [
                ...this.state.commentList, 
                {
                    authorThumbnail,
                    authorUsername,
                    body,
                    writed: true
            }]
        })
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
                <CommentInput postid={this.props.postid} appendComment={this.appendComment}/>
            </Wrapper>
        )
    }
}

export default CommentList;