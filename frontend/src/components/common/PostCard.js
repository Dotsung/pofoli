// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faEye } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart } from '@fortawesome/free-regular-svg-icons'

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
    width: calc(20% - 1.75rem);

    ${media.desktop`
        width: calc(25% - 1.75rem);
    `}

    ${media.tablet`
        width: calc(33% - 1.75rem);
    `}

    ${media.phone`
        width: calc(100% - 1.75rem);
    `}
`

const ThumbnailWrapper = styled.a`
    background-color: ${oc.red[1]};
    width: 100%;
    overflow: hidden;
    display: block;
    max-height: 300px;
`

const CardThumbnail = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`

const CardContents = styled.div`
    background-color: white;
    width: 100%;
    padding: 1rem;
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
    margin-left: 1rem;
    display: flex;
    color: ${oc.gray[7]}
`

const H5 = styled.h5`
    margin: 0px;
    margin-left: 0.1rem;
    font-size: 0.9rem;
    line-height: 0.9rem;
    font-weight: 600;
`

class PostCard extends React.Component{
    render(){
        const { title, author, img, hearts, views } = this.props;
        return(
            <CardWrapper className="CardWrapper">
                <ThumbnailWrapper href="a">
                    <CardThumbnail src={img}/>
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
                        <Views>
                            <FontAwesomeIcon icon={faEye} />
                            <H5>3844</H5>
                        </Views>
                    </Icons>
                </CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;