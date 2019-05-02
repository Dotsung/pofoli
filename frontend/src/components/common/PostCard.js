// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 500px;
    margin: 10px;

    ${media.wide`
        width: calc(20% - 1.75rem);
    `}

    ${media.desktop`
        width: calc(25% - 1.75rem);
    `}

    ${media.tablet`
        width: calc(50% - 1.75rem);
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
    position: relative;
`

const CardThumbnail = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`

const CardContents = styled.div`
    background-color: white;
    width: 100%;
    flex: 1;
`

class PostCard extends React.Component{
    render(){
        const { img } = this.props;
        return(
            <CardWrapper className="CardWrapper">
                <ThumbnailWrapper href="a">
                    <CardThumbnail src={img}/>
                </ThumbnailWrapper>
                <CardContents>content</CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;