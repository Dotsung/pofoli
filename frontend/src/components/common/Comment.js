// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    display: flex;
    padding-top: 1rem;
    // border-top: 1px solid ${oc.gray[5]};
`

const UserThumbnail = styled.img`
    display: block;
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
`

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`

const Username = styled.h3`
    font-size: 1rem;
    margin: 0;
`

const CommentText = styled.span`
    font-size: 1rem;
    padding-top: 0.2rem;
`

// Comment 아이콘을 누르면 Commet아이콘에 파란 불 들어오고 CommentList 불러오기

class Comment extends React.Component{
    render(){
        const { authorThumbnail, authorUsername, body, writed } = this.props;
        return(
            <Wrapper>
                <UserThumbnail src={authorThumbnail} />
                <CommentBox>
                    <Username>{authorUsername}</Username>
                    <CommentText>{body}</CommentText>
                </CommentBox>
            </Wrapper>
        )
    }
}

export default Comment;