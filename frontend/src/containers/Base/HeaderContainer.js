import React from 'react';
import { observer, inject } from 'mobx-react'
import oc from 'open-color';
import Header from 'components/base/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
    border: 0px;
    color: black;
    // background-image: linear-gradient(to right, ${oc.blue[4]} 0%, ${oc.violet[4]} 51%, ${oc.blue[4]} 100%);
    // background-size: 200% auto;
    // transition: 0.5s;

    background-color: white;

    width: 4.5rem;
    height: 1.8rem;
    font-size: 1rem;
    cursor: pointer;

    border: 1px solid black;
    border-radius: 3px;

    &:hover{
        //background-position: right center;
        background-color:  ${oc.gray[9]};
        color: white;
    }
`

const ProfileThumbnail = styled.img`
    // display: block;
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    border: 1px solid ${oc.gray[5]};
    border-radius: 50%;
`

const Href = styled(Link)`
`

const HeaderContainer = ({token, thumbnail}) => {
    const User = ({thumbnail}) => {
        if(thumbnail){
            return (
                <>
                    <ProfileThumbnail src={thumbnail}/>
                </>
            )
        } else {
            return (
                <Href to="/auth/signin"><StyledButton>Login</StyledButton></Href>
            )
        }
    }

    return (
        <Header>
            { User({thumbnail})}
        </Header>
    );
}

export default inject(({ userStore }) => ({
    token: userStore.token,
    thumbnail: userStore.thumbnail
}))(observer(HeaderContainer));

