// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
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

const CardImg = styled.div`
    background-color: ${oc.red[1]};
    flex: 1;
`

const CardContents = styled.div`
    background-color: ${oc.violet[1]};
    flex: 1;
`

class PostCard extends React.Component{
    render(){
        return(
            <CardWrapper className="CardWrapper">
                <CardImg>img</CardImg>
                <CardContents>content</CardContents>
            </CardWrapper>
        )
    }
}

export default PostCard;