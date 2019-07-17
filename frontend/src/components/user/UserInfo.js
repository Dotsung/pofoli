// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import * as profileApi from 'lib/api/profile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import dateFormat from 'dateformat';

const Positioner = styled.div`
    width: 100%;
    padding: 0 500px;
    box-sizing: border-box;

    @media (max-width: 1920px) {
        padding: 0 500px;
    }
    @media (max-width: 1600px) {
        padding: 0 400px;
    }
    @media (max-width: 1400px) {
        padding: 0 200px;
    }
    @media (max-width: 900px) {
        padding: 0 100px;
    }
    @media (max-width: 700px) {
        padding: 0 00px;
    }
`

const Wrapper = styled.div`
    padding: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    @media (max-width: 700px) {
        padding: 20px;
    }
`
const RowDiv = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 700px) {
        flex-direction: column;
    }
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
    @media (max-width: 700px) {
        margin-top: 0;
        margin-left: 0;
    }
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
    margin: 0;
    padding: 0;
    display: block;
`

const Info = styled.p`
    margin: 0;
    margin-left: 5px;
`

const Site = styled.a`
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

const Thumbnailbox = styled.div`
    position: relative;
`

const Filebox = styled.div`
    position: absolute;
    bottom: 90px;
    right: 0;
`

const FileLabel = styled.button`
    color: white;
    background-color: rgba(66, 99, 235, 0.8);
    width: 2rem;
    height: 2rem;
    text-align: center;
    border: none;
    border-radius: 50%;
`

const FileInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 2rem;
    height: 2rem;
    outline: 0 none;
    opacity: 0;
`

const UserInfo = ({username, currentUsername, token}) => {
    const [intro, setIntro] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [email, setEmail] = useState('');
    const [site, setSite] = useState('');

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        profileApi.getProfile({username})
        .then((result) => {
            console.log(result);
            const profile = result.data.profile;
            
            setIntro(profile.introduction);
            setThumbnail(profile.thumbnail);
            setEmail(profile.email);
            setSite(profile.site);
            setCreatedAt(dateFormat(new Date(result.data.createdAt),"yyyy-mm-dd"));
        })
        .catch((result) => {
            console.log(result);
        });
    }

    const returnFileBox = () => {
        if(username === currentUsername){
            return (
                <Filebox>
                    <FileInput type="file" id="fileInput" onChange={onChangeFile}/>
                    <FileLabel><Icon icon={faCameraRetro}/></FileLabel>
                </Filebox>
            )
        }
    }

    const onChangeFile = e => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('image', e.target.files[0]);
        profileApi.updateThumbnail({
            token,
            formData
        })
        .then((result) => {
            console.log(result);
            console.log('성공');
            getProfile();
        })
        .catch((result) => {
            console.log(result);
            console.log('실패');
        });
    }

    return (
        <Positioner>
            <Wrapper>
                <RowDiv>
                    <Thumbnailbox>
                        <Thumbnail src={thumbnail} />
                        {returnFileBox()}
                    </Thumbnailbox>
                    <ColumnDiv>
                        <Username>{username}</Username>
                        <Desc>{intro}</Desc>
                        <InfoList>
                            <InfoDiv>
                                <Icon icon={faCalendarAlt} />
                                <Info>가입일: {createdAt}</Info>
                            </InfoDiv>
                            <InfoDiv>
                                <Icon icon={faEnvelope} />
                                <Site href={`mailto:${email}`}>{email}</Site>
                            </InfoDiv>
                            <InfoDiv>
                                <Icon icon={faLink} />
                                <Site href={site}>{site}</Site>
                            </InfoDiv>
                        </InfoList>
                    </ColumnDiv>
                </RowDiv>
            </Wrapper>
        </Positioner>
    )
}

export default inject(({ userStore }) => ({
    currentUsername: userStore.username,
    token: userStore.token
}))(observer(UserInfo));