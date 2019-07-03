// @flow
import React from 'react';
import styled from 'styled-components';

import UserInfo from 'components/user/UserInfo';
import UserNav from 'components/user/UserNav';

const WhiteBox = styled.div`
    background: white;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const UserContainer = () => {
    return (
        <WhiteBox>
            <Wrapper>
                <UserInfo />
                <UserNav />
            </Wrapper>
        </WhiteBox>
    )
}

export default UserContainer;