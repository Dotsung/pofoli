// @flow
import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faStar as sstar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar as rstar, faEye } from '@fortawesome/free-regular-svg-icons'
import { observer, inject } from 'mobx-react';
import * as ProfileApi from 'lib/api/profile';

import * as postApi from 'lib/api/post';

import CommentList from './CommentList';

const ContentArea = styled.div`
    height: 100vh;
    position: fixed;
    z-index: 30;
    left: 50%;
    top: 0;
    transform: translate(-50%);
    overflow-y: scroll;

    &::-webkit-scrollbar{
        display: none;
    }
`

const WhiteBox = styled.div`
    margin-top: 20%; 
    margin-bottom: 30%;
    box-sizing: border-box;
    background-color: white;
    width: 600px;
    border-radius: 3px;
`

const Content = styled.div`
    box-sizing: border-box;
    padding: 30px;
    padding-bottom: 20px;
`

const Img = styled.img`
    margin-top: 10px;
    width: 100%;
`

const Title = styled.h1`
    margin: 0px;
`

const Desc = styled.p``

const Icons = styled.div`
    border-top: 1px solid ${oc.gray[5]};
    margin-top: 1rem;
    padding-top: 1rem;
    display: flex;
`
const HeartIcon = ({hearted, hearts, ToggleHeart}) => {
    return (
        <Hearts hearted={hearted} onClick={ToggleHeart}>
            <Icon icon={hearted?sheart:rheart} hearted={hearted}/>
            <IconName>Hearts</IconName>
            <H5>{hearts}</H5>
        </Hearts>
    )
}

const StarIcon = ({stared, stars, ToggleStar}) => {
    return (
        <Stars stared={stared} onClick={ToggleStar}>
            <Icon icon={stared?sstar:rstar} stared={stared}/>
            <IconName>Stars</IconName>
            <H5>{stars}</H5>
        </Stars>
    )
}

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
`

const Hearts = styled.div`
    display: flex;
    &:hover{
        color:  ${oc.red[6]};
    }
    color: ${oc.gray[7]};
    cursor: pointer;

    ${
        props=>{
            return props.hearted?`color: ${oc.red[6]}`:``
        }
    }
`

const Views = styled.div`
    display: flex;
    color: ${oc.gray[7]};
`

const CommentNav = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

const Comments = styled.div`
    display: flex;
    &:hover{
        color: ${oc.indigo[5]};
    }
    color: ${oc.gray[7]}
    cursor: pointer;

    ${
        props=>{
            return props.watchComment?`color: ${oc.indigo[5]};`:``
        }
    }
`

const CommentsLine = styled.div`
    ${
        props=>{
            return props.watchComment?`display: block;`:`display: none;`
        }
    }
    position: absolute;
    top: 1.8rem;
    width: 100%;
    margin: 0;
    height: 0.2rem;
    background-color: ${oc.indigo[3]};
`

const Stars = styled.div`
    display: flex;
    color: ${oc.gray[7]}
    &:hover{
        color: ${oc.yellow[5]};
    }
    cursor: pointer;
    
    ${
        props=>{
            return props.stared?`color:${oc.yellow[5]}`:``
        }
    }
`

const IconName = styled.h5`
    margin: 0px;
    margin-left: 0.1rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    font-weight: 600;

    // 스크롤 방지
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
`

const H5 = styled.h5`
    margin: 0px;
    margin-left: 0.5rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    font-weight: 600;

    // 스크롤 방지
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
`

const Spacer = styled.div`
    flex: 1;
`

@inject('userStore')
@inject('postListStore')
@observer
class Post extends React.Component{
    state = {
        watchComment: true,
        title: '',
        body: '',
        image: '',
        hearts: 0,
        views: 0,
        comments: 0,
        stars: 0,
        authorThumbnail: '',
        authorUsername: '',
        createdAt: '',
        updatedAt: '',
        hearted: false,
        stared: false
    }

    componentDidMount(){
        postApi.read({ 
            token: this.props.userStore.token,
            id: this.props.postid 
        }).then((result) => {
            const post = result.data;
            this.setState({
                title: post.title,
                body: post.body,
                image: post.image,
                hearts: post.hearts,
                views: post.views,
                stars: post.stars,
                comments: post.comments,
                authorThumbnail: post.authorThumbnail,
                authorUsername: post.authorUsername,
                hearted: post.hearted,
                stared: post.stared,
                createdAt: post.createdAt
            })
            console.log(this.props.index);
        }).catch((result) => {
            console.log(result)
        });
    }

    ToggleComment = () => {
        this.setState({
            watchComment: !this.state.watchComment
        });
    }

    ToggleHeart = () => {
        if(this.state.hearted){
            this.setState({
                hearted: false,
                hearts: this.state.hearts-1
            });
            postApi.unheart({
                token: this.props.userStore.token,
                postid: this.props.postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(this.props.index !== null){
                this.props.postListStore.unheart({ index: this.props.index });
            }
        } else {
            this.setState({
                hearted: true,
                hearts: this.state.hearts+1
            });
            postApi.heart({
                token: this.props.userStore.token,
                postid: this.props.postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            });
            if(this.props.index !== null){
                this.props.postListStore.heart({ index: this.props.index });
            }
        }
    }

    ToggleStar = () => {
        if(this.state.stared){
            this.setState({
                stared: false,
                stars: this.state.stars-1
            });
            postApi.unstar({
                token: this.props.userStore.token,
                postid: this.props.postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(this.props.index !== null){
                this.props.postListStore.unstar({ index: this.props.index });
            }
        } else {
            this.setState({
                stared: true,
                stars: this.state.stars+1
            });
            postApi.star({
                token: this.props.userStore.token,
                postid: this.props.postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(this.props.index !== null){
                this.props.postListStore.star({ index: this.props.index });
            }
        }
    }

    render(){
        const {title, body, image, hearts, views, stars, comments, hearted, stared } = this.state;

        return(
            <ContentArea>
                <WhiteBox>
                    <Content>
                        <Title>{title}</Title>
                        <Img src={image} />
                        <Desc>{body}</Desc>
                        <Icons>
                            { HeartIcon({hearted:hearted?1:0, hearts, ToggleHeart:this.ToggleHeart}) }
                            <Spacer />
                            <Views>
                                <Icon icon={faEye} />
                                <IconName>Views</IconName>
                                <H5>{views}</H5>
                            </Views>
                            <Spacer />
                            <CommentNav>
                                <Comments onClick={this.ToggleComment} watchComment={this.state.watchComment}>
                                    <Icon icon={faComment} />
                                    <IconName>Commnets</IconName>
                                    <H5>{comments}</H5>
                                </Comments>
                                <CommentsLine watchComment={this.state.watchComment} />
                            </CommentNav>
                            <Spacer />
                            { StarIcon({stared:stared?1:0, stars, ToggleStar: this.ToggleStar}) }
                        </Icons>
                    </Content>
                    <CommentList watchComment={this.state.watchComment} postid={this.props.postid}/>
                </WhiteBox>
            </ContentArea>
        )
    }
}

export default Post;