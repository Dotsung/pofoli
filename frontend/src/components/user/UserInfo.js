// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
`

const Thumbnail = styled.img`
    display: block;
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 50%;
`

const ColumnDiv = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
`

const Username = styled.h2`
    margin: 0;
`

const Desc = styled.p`
    margin: 0;
`

const UserInfo = () => {
    return (
        <Wrapper>
            <Thumbnail src="https://dotia-files.s3.ap-northeast-2.amazonaws.com/5d19ec31c9637a205c939243fa6f6c0ab23285c870e7c9bc1dfe1c2d.gif" />
            <ColumnDiv>
                <Username>dotsung</Username>
                <Desc>I'm pixel art man from aaa</Desc>
            </ColumnDiv>
        </Wrapper>
    )
}

export default UserInfo;