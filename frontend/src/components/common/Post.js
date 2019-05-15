// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sheart, faStar as sstar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rheart, faComment, faStar as rstar, faEye } from '@fortawesome/free-regular-svg-icons'

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
`

const Img = styled.img`
    margin-top: 10px;
    width: 100%;
`

const Title = styled.h1`
    margin: 0px;
`

const Desc = styled.p`

`

const Icons = styled.div`
    border-top: 1px solid ${oc.gray[5]};
    margin-top: 1rem;
    padding-top: 1rem;
    display: flex;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.2rem;
`

const Hearts = styled.div`
    display: flex;
    &:hover{
        color: red;
    }
    color: ${oc.gray[7]}
    cursor: pointer;
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
`

const Star = styled.div`
    display: flex;
    color: ${oc.gray[7]}
    &:hover{
        color: ${oc.yellow[5]};
    }
    cursor: pointer;
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
    render(){
        const { title, date, author, body, img, hearts, views, comments, stars } = this.props;
        return(
            <ContentArea>
                <WhiteBox>
                    <Content>
                        <Title>{title}</Title>
                        <Img src={img} />
                        <Desc>{body}</Desc>
                        <Icons>
                        <Hearts>
                            <Icon icon={rheart} />
                            <IconName>Hearts</IconName>
                            <H5>{hearts}</H5>
                        </Hearts>
                        <Spacer />
                        <Views>
                            <Icon icon={faEye} />
                            <IconName>Views</IconName>
                            <H5>{views}</H5>
                        </Views>
                        <Spacer />
                        <Comments>
                            <Icon icon={faComment} />
                            <IconName>Commnets</IconName>
                            <H5>{comments}</H5>
                        </Comments>
                        <Spacer />
                        <Star>
                            <Icon icon={rstar} />
                            <IconName>Stars</IconName>
                            <H5>{stars}</H5>
                        </Star>
                        </Icons>
                    </Content>
                </WhiteBox>
            </ContentArea>
        )
    }
}

export default Post;