import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Padding = styled.div`
    width: 33%;
    padding: 10px;
    box-sizing: border-box;

    @media (max-width:1200px) {
        width: 50%;
    }
    @media (max-width:700px) {
        width: 100%;
        padding-bottom: 0;
    }
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
    padding: 1rem;
    box-sizing: border-box;
`

const Thumbnail = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`

const Info = styled.div`
    margin-left: 0.5rem;
    display: flex;
    flex-direction: column;
    min-width: 0px;
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
    color: ${oc.gray[7]};
`

const UserCard = ({thumbnail, username, intro}) => {
    return (
        <Padding>
            <WhiteBox>
                <Wrapper>
                    <Thumbnail src={thumbnail}/>
                    <Info>
                        <Username>{username}</Username>
                        <Intro>{intro}</Intro>
                    </Info>
                </Wrapper>
            </WhiteBox>
        </Padding>
    );
};

export default UserCard;