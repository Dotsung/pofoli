// @flow
import React from 'react';
import styled from 'styled-components';

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

const UserContainer = () => {
    return (
        <>
        <WhiteBox>
            <Wrapper>
                <UserInfo />
                <UserNav />
            </Wrapper>
        </WhiteBox>
        <PostCardList />
        </>
    )
}

export default UserContainer;