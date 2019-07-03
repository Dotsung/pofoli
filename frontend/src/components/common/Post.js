// @flow
import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import oc from 'open-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faStar as sstar, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar as rstar, faEye } from '@fortawesome/free-regular-svg-icons'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

import * as postApi from 'lib/api/post';

import CommentList from './CommentList';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    @media (max-width: 700px) {
        height: 100%;
    }
`

const VBlank = styled.div`
    width: 100%;
    height: 100px;
    @media (max-width: 700px) {
        display: none;
    }
`

const RowFlexDiv = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 700px) {
        min-height: 100%;
    }
`

const HBlank = styled.div`
    flex: 1;
`

const WhiteBox = styled.div`
    box-sizing: border-box;
    background-color: white;
    width: 600px;
    border-radius: 3px;
    overflow: auto;

    @media (max-width: 700px) {
        width: 100%;
        min-height: 100%;
        margin: 0;
        border-radius: 0;
    }
`

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 3rem;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);

    display: none;
    @media (max-width: 700px) {
        display: flex;
    }
`

const GoBackIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    margin: auto 10px;
    color: ${oc.indigo[7]};
`

const HeaderText = styled.h3`
    margin: auto 10px;
    font-size: 1.5rem;
    color: ${oc.gray[8]};
`

const Content = styled.div`
    box-sizing: border-box;
    padding: 20px 30px;
    @media (max-width: 700px) {
        padding: 20px;
        padding-top: 50px;
    }
    padding-bottom: ${props => props.watchComment?`10px`:`20px`};
`

const Img = styled.img`
    margin-top: 5px;
    width: 100%;
`

const Title = styled.h1`
    margin: 0px;
    font-size: 1.5rem;
`

const AuthorThumbnail = styled.img`
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    margin-right: 5px;
    border-radius: 50%;
`

const AuthorUsername = styled.h3`
    margin: 0;
    color: ${oc.gray[9]};
    //align-self: flex-end;
`

const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    //flex-direction: row-reverse;
`

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CreatedAt = styled.h3`
    margin: 0;
    color: ${oc.gray[7]};
    align-self: flex-end;
    font-size: 1rem;
`

const Desc = styled.p`
    margin: 0;
    white-space: pre-line;
    font-weight: Medium;
`

const Icons = styled.div`
    border-top: 1px solid ${oc.gray[4]};
    margin-top: 6px;
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

    @media (max-width: 700px) {
        display: none;
    }

    // 마우스 드래그 방지
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

    // 마우스 드래그 방지
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

const Post = ({ token, getPost, heart, unheart, star, unstar, postid, index, history}) => {
    const [watchComment, setWatchComment] = useState(true);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [hearts, setHearts] = useState(0);
    const [views, setViews] = useState(0);
    const [comments, setComments] = useState(0);
    const [stars, setStars] = useState(0);
    const [authorThumbnail, setAuthorThumbnail] = useState('');
    const [authorUsername, setAuthorUsername] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [hearted, setHearted] = useState(false);
    const [stared, setStared] = useState(false);

    useEffect(() => {
        let post = getPost({index});
        if(post){
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);
            setHearts(post.hearts);
            setViews(post.views);
            setStars(post.stars);
            setComments(post.comments);
            setAuthorThumbnail(post.authorThumbnail);
            setAuthorUsername(post.authorUsername);
            setHearted(post.hearted);
            setStared(post.stared);
            setCreatedAt(dateFormat(new Date(post.createdAt),"yyyy-mm-dd HH:MM"));
        } else {
            postApi.read({
                token, postid
            }).then((result) => {
                post = result.data;
                console.log(post);
                setTitle(post.title);
                setBody(post.body);
                setImage(post.image);
                setHearts(post.hearts);
                setViews(post.views);
                setStars(post.stars);
                setComments(post.comments);
                setAuthorThumbnail(post.authorThumbnail);
                setAuthorUsername(post.authorUsername);
                setHearted(post.hearted);
                setStared(post.stared);
                setCreatedAt(dateFormat(new Date(post.createdAt),"yyyy-mm-dd HH:MM"));
            }).catch((result) => {
                console.log(result)
            });
        }
    }, []);

    const ToggleComment = () => {
        setWatchComment(!watchComment);
    }

    const ToggleHeart = () => {
        if(hearted){
            setHearted(false);
            setHearts(hearts-1);
            postApi.unheart({
                token,
                postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(index !== null){
                unheart({ index });
            }
        } else {
            setHearted(true);
            setHearts(hearts+1);
            postApi.heart({
                token,
                postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            });
            if(index !== null){
                heart({ index });
            }
        }
    }

    const ToggleStar = () => {
        if(stared){
            setStared(false);
            setStars(stars-1);
            
            postApi.unstar({
                token,
                postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(index !== null){
                unstar({index});
            }
        } else {
            setStared(true);
            setStars(stars+1);

            postApi.star({
                token, 
                postid
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            if(index !== null){
                star({index});
            }
        }
    }

    const goBack = () => history.push(history.location.pathname.replace('post/'+postid, ''));

    return(
        <Wrapper>
            <VBlank onClick={goBack}/>
            <RowFlexDiv>
                <HBlank onClick={goBack}/>
                <WhiteBox>
                    <Header>
                        <GoBackIcon icon={faChevronLeft} onClick={goBack} />
                        <HeaderText>Posts</HeaderText>
                    </Header>
                    <Content watchComment={watchComment?1:0}>
                        <DateWrapper>
                            <AuthorThumbnail src={authorThumbnail} />
                            <ColumnWrapper>
                                <AuthorUsername>{authorUsername}</AuthorUsername>
                                <CreatedAt>{createdAt}</CreatedAt>
                            </ColumnWrapper>
                            <Spacer/>
                        </DateWrapper>
                        <Title>{title}</Title>
                        <Img src={image} />
                        <Desc>{body}</Desc>
                        <Icons>
                            { HeartIcon({hearted:hearted?1:0, hearts, ToggleHeart}) }
                            <Spacer />
                            <Views>
                                <Icon icon={faEye} />
                                <IconName>Views</IconName>
                                <H5>{views}</H5>
                            </Views>
                            <Spacer />
                            <CommentNav>
                                <Comments onClick={ToggleComment} watchComment={watchComment}>
                                    <Icon icon={faComment} />
                                    <IconName>Commnets</IconName>
                                    <H5>{comments}</H5>
                                </Comments>
                            </CommentNav>
                            <Spacer />
                            { StarIcon({stared:stared?1:0, stars, ToggleStar}) }
                        </Icons>
                    </Content>
                    <CommentList watchComment={watchComment} postid={postid}/>
                </WhiteBox>
                <HBlank onClick={goBack}/>
            </RowFlexDiv>
            <VBlank onClick={goBack}/>
        </Wrapper>
    )
}

export default inject(({ userStore, postListStore }) => ({
    token: userStore.token,
    getPost: postListStore.getPost,
    heart: postListStore.heart,
    unheart: postListStore.unheart,
    star: postListStore.star,
    unstar: postListStore.unstar
}))(observer(Post));