// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faStar as sstar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar as rstar, faEye } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import * as postApi from 'lib/api/post';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    break-inside: avoid;
`

const ThumbnailWrapper = styled.div`
    position: relative;
    background-color: ${oc.red[1]};
    width: 100%;
    overflow: hidden;
    display: block;
    height:100%;
    max-height: 400px;
    z-index: 1;
    cursor: pointer;
`

const CardThumbnail = styled.img`
    object-fit: cover;
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
        // display: inline-block;
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
    color: ${oc.gray[6]};
`

const Icons = styled.div`
    margin-top: 1rem;
    display: flex;
    border-top: 1px solid ${oc.gray[5]};
    padding-top: 1rem;
`

const HeartIcon = ({hearted, hearts, ToggleHeart}) => {
    return (
        <Hearts hearted={hearted?1:0} onClick={ToggleHeart}>
            <Icon icon={hearted?sheart:rheart} />
            <H5>{hearts}</H5>
        </Hearts>
    )
}

const StarIcon = ({stared, stars, ToggleStar}) => {
    return (
        <Stars stared={stared?1:0} onClick={ToggleStar}>
            <Icon icon={stared?sstar:rstar} />
            <H5>{stars}</H5>
        </Stars>
    )
}

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

const Comments = styled.div`
    display: flex;
    &:hover{
        color: ${oc.indigo[5]};
    }
    color: ${oc.gray[7]}
    cursor: pointer;
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

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
`

const H5 = styled.h5`
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

const Spacer = styled.div`
    flex: 1;
`

@inject('userStore')
@inject('postListStore')
@observer
class PostCard extends React.Component{
    // state = {
    //     hearted: this.props.hearted,
    //     stared: this.props.stared,
    //     hearts: this.props.hearts,
    //     views: this.props.views,
    //     comments: this.props.comments,
    //     stars: this.props.stars,
    // };

    // ToggleHeart = () => {
    //     if(this.props.postListStore.postList[this.props.index].hearted){
    //         this.props.postListStore.unheart({index:this.props.index});
    //         this.props.postListStore.deheart({index:this.props.index});
    //         this.props.userStore.unheart(this.props.id);
    //         ProfileApi.unheart({
    //             _id: this.props.userStore._id,
    //             postid: this.props.id
    //         })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((result) => {
    //             console.log(result);
    //         })
    //     }else {
    //         this.props.postListStore.heart({index:this.props.index});
    //         this.props.postListStore.inheart({index:this.props.index});
    //         this.props.userStore.heart(this.props.id);
    //         ProfileApi.heart({
    //             _id: this.props.userStore._id,
    //             postid: this.props.id
    //         })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((result) => {
    //             console.log(result);
    //         })
    //     }
    // }

    // ToggleStar = () => {
    //     if(this.props.postListStore.postList[this.props.index].stared){
    //         this.props.postListStore.unstar({index:this.props.index});
    //         this.props.postListStore.destar({index:this.props.index});
    //         this.props.userStore.unstar(this.props.id);
    //         ProfileApi.unstar({
    //             _id: this.props.userStore._id,
    //             postid: this.props.id
    //         })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((result) => {
    //             console.log(result);
    //         })
    //     } else {            
    //         this.props.postListStore.star({index:this.props.index});
    //         this.props.postListStore.instar({index:this.props.index});
    //         this.props.userStore.star(this.props.id);
    //         ProfileApi.star({
    //             _id: this.props.userStore._id,
    //             postid: this.props.id
    //         })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((result) => {
    //             console.log(result);
    //         })
    //     }
    // }

    ToggleHeart = () => {
        if(this.props.postListStore.postList[this.props.index].hearted){    
            postApi.unheart({
                token: this.props.userStore.token,
                postid: this.props.id
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            this.props.postListStore.unheart({index: this.props.index});
        }else {
            postApi.heart({
                token: this.props.userStore.token,
                postid: this.props.id
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            this.props.postListStore.heart({index: this.props.index});
        }
    }

    ToggleStar = () => {
        if(this.props.postListStore.postList[this.props.index].stared){
            postApi.unstar({
                token: this.props.userStore.token,
                postid: this.props.id
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            this.props.postListStore.unstar({index: this.props.index});
        } else {
            postApi.star({
                token: this.props.userStore.token,
                postid: this.props.id
            })
            .then((result) => {
                console.log(result);
            })
            .catch((result) => {
                console.log(result);
            })
            this.props.postListStore.star({index: this.props.index});
        }
    }

    // getHearted = (postid) => {
    //     if(this.state.heartload){
    //         this.props.userStore.hearted.forEach((id) => {
    //             if(postid === id){
    //                 if(this.state.hearted === false){
    //                     this.setState({
    //                         hearted: true,
    //                         heartload: false
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // }

    // getStared = (postid) => {
    //     if(this.state.starload){
    //         this.props.userStore.stared.forEach((id) => {
    //             if(postid === id){
    //                 if(this.state.stared === false){
    //                     this.setState({
    //                         stared: true,
    //                         starload: false
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // }

    render(){
        // console.log(this.props.userStore.hearted);
        // console.log(this.props.userStore.state);
        const { id, title, date, img, authorThumbnail, authorUsername, index } = this.props;
        const { hearted, stared, hearts, views, comments, stars } = this.props.postListStore.postList[index];
        const { ToggleHeart, ToggleStar, StateTest } = this;

        return(
            <CardWrapper>
                <Link to={{
                    pathname: "/post/"+id,
                    state: {
                        index: index
                    }
                }}>
                    <ThumbnailWrapper>
                        <CardThumbnail src={img}/>
                        <Mask />
                    </ThumbnailWrapper>
                </Link>
                <CardContents>
                    <UserThumbnailWrapper href="/">
                        <UserThumbnail src={authorThumbnail}/>
                    </UserThumbnailWrapper>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDate>
                        {date}
                    </CardDate>
                    <Icons>
                        { HeartIcon({hearted, hearts, ToggleHeart}) }
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
                        { StarIcon({stared, stars, ToggleStar }) }
                    </Icons>
                </CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;