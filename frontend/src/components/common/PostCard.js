// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);

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
                </CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;