import React, { useState } from 'react';

import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

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
    cursor: pointer;
`

const DropdownMenu = styled.div`
    position: absolute;
    top: 55px;
    right: 0;
    display: ${props=>props.dropdown?`flex`:`none`};
    flex-direction: column;
    width: 130px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
`

const DropdownItem = styled.button`
    width: 130px;
    height: 35px;
    border: none;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: ${oc.indigo[0]};
    }
`

const HeaderContainer = ({token, username, Login, thumbnail}) => {
    const [dropdown, setDropdown] = useState(false);

    const onLogout = () => {
        localStorage.setItem('dotia-token', null);
        window.location.reload();
    }

    const User = ({thumbnail}) => {
        if(thumbnail){
            return (
                <>
                <DropdownMenu dropdown={dropdown?1:0}>
                    <a href={"/user/"+username+"/posts/"}><DropdownItem>프로필</DropdownItem></a>
                    <DropdownItem onClick={onLogout}>로그아웃</DropdownItem>
                </DropdownMenu>
                    <ProfileThumbnail src={thumbnail} onClick={() => {setDropdown(!dropdown)}}/>
                </>
            )
        } else {
            return (
                <Link to="/auth/signin"><StyledButton>Login</StyledButton></Link>
            )
        }
    }

    return (
        <Header setDropdown={setDropdown}>
            { User({thumbnail})}
        </Header>
    );
}

export default inject(({ userStore }) => ({
    token: userStore.token,
    username: userStore.username,
    Login: userStore.Login,
    thumbnail: userStore.thumbnail
}))(observer(HeaderContainer));