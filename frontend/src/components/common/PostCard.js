// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar, faEye } from '@fortawesome/free-regular-svg-icons'

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
    background-color: white;
    width: 100%;
    padding: 1rem;
    height: 7rem;
    flex: 1;
    box-sizing: border-box;
`

const CardTitle = styled.h3`
    margin: 0px;
`

const CardDate = styled.span`
    color: ${oc.gray[6]}
`

const Icons = styled.div`
    margin-top: 0.5rem;
    display: flex;
    border-top: 1px solid ${oc.gray[5]};
    padding-top: 0.5rem;
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
    font-size: 0.9rem;
    line-height: 0.9rem;
    font-weight: 600;
`

const Spacer = styled.div`
    flex: 1;
`

class PostCard extends React.Component{
    render(){
        const { title, author, img, hearts, views } = this.props;
        return(
            <CardWrapper>
                <ThumbnailWrapper href="a">
                    <CardThumbnail src={img}/>
                    <Mask />
                </ThumbnailWrapper>
                <CardContents>
                    <CardTitle>
                        Penguin
                    </CardTitle>
                    <CardDate>
                        2019.03.03
                    </CardDate>
                    <Icons>
                        <Likes>
                            <FontAwesomeIcon icon={rheart} />
                            <H5>234</H5>
                        </Likes>
                        <Spacer />
                        <Views>
                            <FontAwesomeIcon icon={faEye} />
                            <H5>3844</H5>
                        </Views>
                        <Spacer />
                        <Comments>
                            <FontAwesomeIcon icon={faComment} />
                            <H5>45</H5>
                        </Comments>
                        <Spacer />
                        <Star>
                            <FontAwesomeIcon icon={faStar} />
                            <H5>67</H5>
                        </Star>
                    </Icons>
                </CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;