// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Positioner = styled.div`
    width: 100%;
    padding: 0 500px;
    box-sizing: border-box;

    
`

const Wrapper = styled.div`
    padding: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`
const RowDiv = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
`

const Thumbnail = styled.img`
    display: block;
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 50%;
`

const ColumnDiv = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
`

const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const InfoDiv = styled.div`
    display: flex;
    margin-top: 5px;
    color: ${oc.gray[9]};
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
`

const Info = styled.p`
    margin: 0;
    margin-left: 5px;
`

const InfoA = styled.a`
    margin: 0;
    margin-left: 5px;
    font-size: 1rem;
    color: ${oc.indigo[7]};
    &:link{
        color: ${oc.indigo[7]};
        text-decoration: none;
    }
`

const Username = styled.h2`
    font-size: 2rem;
    margin: 0;
`

const Desc = styled.p`
    margin: 0;
`

const UserInfo = () => {
    return (
        <Positioner>
            <Wrapper>
                <RowDiv>
                    <Thumbnail src="https://dotia-files.s3.ap-northeast-2.amazonaws.com/5d19ec31c9637a205c939243fa6f6c0ab23285c870e7c9bc1dfe1c2d.gif" />
                    <ColumnDiv>
                        <Username>Dotsung</Username>
                        <Desc>I'm pixel art man from hell</Desc>
                        <InfoList>
                            <InfoDiv>
                                <Icon icon={faCalendarAlt} />
                                <Info>가입일: 2019.06.23</Info>
                            </InfoDiv>
                            <InfoDiv>
                                <Icon icon={faEnvelope} />
                                <InfoA href="mailto:dotsung22@gmail.com">dotsung22@gmail.com</InfoA>
                            </InfoDiv>
                            <InfoDiv>
                                <Icon icon={faLink} />
                                <InfoA href="https://github.com/Dotsung">https://github.com/Dotsung</InfoA>
                            </InfoDiv>
                        </InfoList>
                    </ColumnDiv>
                </RowDiv>
            </Wrapper>
        </Positioner>
    )
}

export default UserInfo;