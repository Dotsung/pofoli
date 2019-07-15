// @flow
import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import UserInfo from 'components/user/UserInfo';
import UserNav from 'components/user/UserNav';
import PostCardList from 'containers/common/PostCardList';

const WhiteBox = styled.div`
    background: white;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const UserContainer = ({username}) => {
    return (
        <>
        <WhiteBox>
            <Wrapper>
                <UserInfo username={username}/>
                <UserNav username={username}/>
            </Wrapper>
        </WhiteBox>
        {
            //<PostCardList username={username}/>
        }
        <Route path={'/user/:username/:category'} component={PostCardList}/>
        </>
    )
}

export default UserContainer;