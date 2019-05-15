// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faStar as sstar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar as rstar, faEye } from '@fortawesome/free-regular-svg-icons'

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
    color: ${oc.gray[7]}
    cursor: pointer;

    ${
        props=>{
            return props.hearted?`color: ${oc.red[6]}`:``
        }
    }
`

const Views = styled.div`
    display: flex;
    color: ${oc.gray[7]}
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
`

const H5 = styled.h5`
    margin: 0px;
    margin-left: 0.5rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    font-weight: 600;
`

const Spacer = styled.div`
    flex: 1;
`

class Post extends React.Component{
    state = {
        watchComment: Boolean(false)
    }

    ToggleComment = () => {
        this.setState({
            watchComment: !this.state.watchComment
        });
        console.log(this.state.watchComment);
    }

    render(){
        const { title, date, author, body, img, hearts, views, comments, stars, hearted, ToggleHeart, stared, ToggleStar } = this.props;
        return(
            <ContentArea>
                <WhiteBox>
                    <Content>
                        <Title>{title}</Title>
                        <Img src={img} />
                        <Desc>{body}</Desc>
                        <Icons>
                            { HeartIcon({hearted, hearts, ToggleHeart}) }
                            <Spacer />
                            <Views>
                                <Icon icon={faEye} />
                                <IconName>Views</IconName>
                                <H5>{views}</H5>
                            </Views>
                            <Spacer />
                            <Comments onClick={this.ToggleComment} watchComment={this.state.watchComment}>
                                <Icon icon={faComment} />
                                <IconName>Commnets</IconName>
                                <H5>{comments}</H5>
                            </Comments>
                            <Spacer />
                            { StarIcon({stared, stars, ToggleStar}) }
                        </Icons>
                    </Content>
                    <CommentList img={img} watchComment={this.state.watchComment}/>
                </WhiteBox>
            </ContentArea>
        )
    }
}

export default Post;