// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    padding: 1rem;
    display: flex;
    border-top: 1px solid ${oc.gray[5]};
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


class Comment extends React.Component{
    render(){
        const { img } = this.props;
        return(
            <Wrapper>
                <UserThumbnail src={img} />
                <CommentBox>
                    <Username>dosung</Username>
                    <CommentText>lorem ipsum dolor shit.</CommentText>
                </CommentBox>
            </Wrapper>
        )
    }
}

export default Comment;