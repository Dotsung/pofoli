// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar, faEye } from '@fortawesome/free-regular-svg-icons'

import PostContainer from 'containers/common/PostContainer';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
    width: 100%;
    break-inside: avoid;
`

const ThumbnailWrapper = styled.a`
    position: relative;
    background-color: ${oc.red[1]};
    width: 100%;
    overflow: hidden;
    display: block;
    height:100%;
    max-height: 300px;
    z-index: 1;
`

const CardThumbnail = styled.img`
    // object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
`

const Mask = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    opacity: 0;
    transition: 0.125s all ease-in;

    &:hover {
        opacity: 1;
    }
`

const CardContents = styled.div`
    position: relative;
    z-index: 1;
    background-color: white;
    width: 100%;
    padding: 1rem;
    height: 7rem;
    flex: 1;
    box-sizing: border-box;
`


const UserProfile = styled.div`
    display: none;
    position: absolute;
    right: 4rem;
    top: -4rem;
    background: ${oc.gray[1]};
    height: 8rem;
    width: 10rem;
    margin: 0 auto 10px;
    animation: fadein 0.5s;

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    &:after{
        content: '';
        position: absolute;
        border-left: 10px solid ${oc.gray[1]};
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        bottom: 2rem;
        left: 10rem;
    }
`

const UserThumbnailWrapper = styled.a`
    position: absolute;
    right: 1rem;
    top: 0;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: white;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    display: felx;

    &:hover ${UserProfile} {
        display: inline-block;
    }
`

const UserThumbnail = styled.img`
    display: block;
    width: 3.75rem;
    height: 3.75rem;
    object-fit: cover;
    border-radius: 50%;
`

const CardTitle = styled.h3`
    margin: 0px;
    font-size: 1.5rem;
`

const CardDate = styled.span`
    font-size: 1.2rem;
    color: ${oc.gray[6]}
`

const Icons = styled.div`
    margin-top: 1rem;
    display: flex;
    border-top: 1px solid ${oc.gray[5]};
    padding-top: 1rem;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
`

const Likes = styled.div`
    display: flex;
    &:hover{
        color: red;
    }
    color: ${oc.gray[7]}
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
`

const Star = styled.div`
    display: flex;
    color: ${oc.gray[7]}
    &:hover{
        color: ${oc.yellow[5]};
    }
`

const H5 = styled.h5`
    margin: 0px;
    margin-left: 0.1rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    font-weight: 600;
`

const Spacer = styled.div`
    flex: 1;
`

class PostCard extends React.Component{
    state = {
        modal: false
    };
    
    ModalOnOff = () => {
        this.setState({
            modal: !this.state.modal
        })
        console.log(this.state.modal);
    }

    render(){
        const { title, date, author, img, hearts, views, comments, stars } = this.props;
        
        return(
            <CardWrapper>
                <PostContainer modal={this.state.modal} ModalOnOff={this.ModalOnOff} {...this.props}/>
                <ThumbnailWrapper onClick={this.ModalOnOff}>
                    <CardThumbnail src={img}/>
                    <Mask />
                </ThumbnailWrapper>
                <CardContents>
                    <UserThumbnailWrapper href="a">
                        <UserThumbnail src={img}/>
                        <UserProfile />
                    </UserThumbnailWrapper>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDate>
                        {date}
                    </CardDate>
                    <Icons>
                        <Likes>
                            <Icon icon={rheart} />
                            <H5>{hearts}</H5>
                        </Likes>
                        <Spacer />
                        <Views>
                            <Icon icon={faEye} />
                            <H5>{views}</H5>
                        </Views>
                        <Spacer />
                        <Comments>
                            <Icon icon={faComment} />
                            <H5>{comments}</H5>
                        </Comments>
                        <Spacer />
                        <Star>
                            <Icon icon={faStar} />
                            <H5>{stars}</H5>
                        </Star>
                    </Icons>
                </CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;