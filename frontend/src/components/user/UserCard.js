import React from 'react';
import styled from 'styled-components';

const Padding = styled.div`
    width: 33%;
    padding: 10px;
    box-sizing: border-box;
`

const WhiteBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
`

const ThumbnailWrapper = styled.div`
`

const Thumbnail = styled.img`
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
`

const Username = styled.h3`
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Intro = styled.span`
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const UserCard = () => {
    return (
        <Padding>
            <WhiteBox>
                <Wrapper>
                    <ThumbnailWrapper>
                        <Thumbnail src="https://dotia-files.s3.ap-northeast-2.amazonaws.com/5d10d4b61cafd92c8c6b641e49e1fda64733cc87b30df17172a07c6c.gif"/>
                    </ThumbnailWrapper>
                    <Info>
                        <Username>Dotsung</Username>
                        <Intro>HI, I'm dotsung.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse c</Intro>
                    </Info>
                </Wrapper>
            </WhiteBox>
        </Padding>
    );
};

export default UserCard;