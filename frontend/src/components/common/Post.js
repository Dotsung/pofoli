// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar, faEye } from '@fortawesome/free-regular-svg-icons'

const ContentArea = styled.div`
    position: fixed;
    z-index: 30;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

const WhiteBox = styled.div`
    box-sizing: border-box;
    background-color: white;
    width: 800px;
    height: 900px;
`

const Content = styled.div`
    box-sizing: border-box;
    padding: 30px;
`

const Title = styled.h1`
    margin: 0px;
`

class Post extends React.Component{
    render(){
        const { title, date, author, img, hearts, views, comments, stars } = this.props;
        return(
            <ContentArea>
                <WhiteBox>
                    <Content>
                        <Title>{title}</Title>
                    </Content>
                </WhiteBox>
            </ContentArea>
        )
    }
}

export default Post;